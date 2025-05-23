import { createContext, useContext, useMemo } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "./AuthProvider";
import getSelectableFields from "../helper/selectableFields";
const SupabaseContext = createContext();
import defaultFormFields from "../helper/default_form_value";
const SupabaseProvider = ({ children }) => {
  const { user } = useAuth();


  const insertData = async (table, data, multiple = false, conflictKeys = []) => {
    try {
      const payload = multiple ? data : [data];
      const { data: res, error } = await supabase
        .from(table)
        .upsert(payload, {
          onConflict: conflictKeys,
          ignoreDuplicates: false,
        })
        .select("id");

      if (error) throw error;
      return res;
    } catch (error) {
      console.error(`Upsert error in table "${table}":`, error);
      return null;
    }
  };

  const retriveData = async (table, fields = "*", filters = {}, orderBy = null, orderDesc = false,limit) => {
    try {
      let query = supabase.from(table).select(fields);
      Object.entries(filters).forEach(([key, val]) => query = query.eq(key, val));
      if (orderBy) query = query.order(orderBy, { ascending: !orderDesc });
      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Retrieval error from "${table}":`, error);
      return null;
    }
  };

  const uploadFileWithProgress = async (file, onProgress) => {
    if (!file || !user?.id) return console.warn("Missing file or user");

    const bucket = "files";
    const path = `images/${user.id}/${file.name}`;

    try {
      const { data: urlData, error: urlError } = await supabase.storage.from(bucket).createSignedUploadUrl(path);
      if (urlError) throw urlError;

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", urlData.signedUrl, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status !== 200) console.error("Upload failed:", xhr.responseText);
      };
      xhr.onerror = () => console.error("XHR upload error");

      xhr.send(file);
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  const getFiles = async () => {
    if (!user?.id) return console.warn("User not logged in");

    try {
      const { data: files, error } = await supabase.storage.from("files").list(`images/${user.id}`);
      if (error) throw error;

      const urls = await Promise.all(
        files.map(async (file) => {
          const { data: signed, error: signedError } = await supabase.storage
            .from("files")
            .createSignedUrl(`images/${user.id}/${file.name}`, 3600);
          if (signedError) {
            console.error("Signed URL error for", file.name, signedError.message);
            return null;
          }
          return {
            url: signed.signedUrl,
            ...file


          }
        })
      );

      return urls.filter(Boolean);
    } catch (err) {
      console.error("Error fetching files:", err.message);
    }
  };
  const getSavedData = async (layout_details) => {
    try {
      if (!user?.id) return {};

      const selectFields = getSelectableFields(layout_details);
      selectFields.push("personalDetails");
      const orderBy = ["created_at", true];
      const res = {};

      if (!selectFields.includes("personalDetails")) return res;

      const [personalDetails] = await retriveData("users", "*", { auth_id: user.id }, ...orderBy);
      if (!personalDetails) return {};

      const user_id = personalDetails.id;
      res.personalDetails = personalDetails;

      const fetchWithFallback = async (table, defaultValue,limit) => {
        const data = await retriveData(table, "*", { user_id }, ...orderBy,limit);
        return data?.length ? data : defaultValue;
      };


      const urls = await fetchWithFallback("urls", [{ value: "" }], 2);
      res.personalDetails = {
        ...res.personalDetails,
        urls: urls.map((u, _) => ({ value: u.url }))
      }



      if (selectFields.includes("educations")) {
        res.educations = await fetchWithFallback("educations", defaultFormFields.educations);
      }

      if (selectFields.includes("achievements")) {
        res.achievements = await fetchWithFallback("achievements", defaultFormFields.achievements);
      }



      if (selectFields.includes("experiences")) {
        const experiences = await retriveData("experiences", "*", { user_id }, ...orderBy);
        const expIds = experiences.map(e => e.id);

        const { data: expAchieves, error } = await supabase
          .from("experience_achievements")
          .select("*")
          .in("experience_id", expIds);
        if (error) console.error("experience_achievements fetch error:", error);

        res.experiences = experiences.map(exp => ({
          ...exp,
          achievements:
            expAchieves
              ?.filter(a => a.experience_id === exp.id)
              .map(a => ({ value: a.achievement })) || [{ value: "" }]
        })) || defaultFormFields.experiences;
      }
      if (selectFields.includes("strengths")) {
        const strengths = await fetchWithFallback("strengths", defaultFormFields.strengths);
        res.strengths = strengths.map(str => ({
          title: str.title,
          description: str.description
        }));

      }
      if (selectFields.includes("certificates")) {
        const certificates = await fetchWithFallback("certificates", defaultFormFields.certificates);
        res.certificates = certificates.map(cert => ({
          certificate: cert.certificate,
          subject: cert.subject,
          date: cert.date
        }));
      }
      if (selectFields.includes("languages")) {
        res.languages = await fetchWithFallback("languages", defaultFormFields.languages);
      }
      if (selectFields.includes("industryExpertise")) {
        res.industryExpertise = await fetchWithFallback("industry_expertise", defaultFormFields.industryExpertise);
      }
      if (selectFields.includes("openSourceWork")) {
        const openSourceWork = await fetchWithFallback("open_source_work", defaultFormFields.openSourceWork);
        console.log("openSourceWork", openSourceWork)
        const technologies = openSourceWork.map(os => os.technologies).flat();
        const parsedTechnologies = technologies
          .map(t => {
            try {
              return JSON.parse(t);
            } catch (e) {
              return null; // skip invalid JSON
            }
          })
          .filter(t => t && t.value?.toString().trim()) // removes nulls and empty values
          .map(t => ({ value: t.value }));
        res.openSourceWork = openSourceWork.map(os => ({
          project_name: os.project_name,
          role: os.role,
          description: os.description,
          technologies: parsedTechnologies,
          link: os.link,
          date: os.date
        }));
      }
      if (selectFields.includes("passions")) {
        const passions = await fetchWithFallback("passions", defaultFormFields.passions);
        res.passions = passions.map(p => ({
          passion: p.passion
        }));
      }
      if (selectFields.includes("trainings")) {
        const trainings = await fetchWithFallback("trainings", defaultFormFields.trainings);
        res.trainings = trainings.map(t => ({
          title: t.title,
          organization: t.organization,
          year: t.year,
          location: t.location
        }));
      }
      if (selectFields.includes("awards")) {
        const awards = await fetchWithFallback("awards", defaultFormFields.awards);
        res.awards = awards.map(a => ({
          title: a.title,
          organization: a.organization,
          year: a.year,

        }));
      }
      if (selectFields.includes("my_time")) {
        const my_time = await fetchWithFallback("my_time", defaultFormFields.my_time);
        res.my_time = my_time.map(m => ({
          activity: m.activity,
          value: m.value
        }));
      }
      if (selectFields.includes("skills")) {
        const skills = await fetchWithFallback("skills", defaultFormFields.skills,1);
        const skillItems = skills.map(s => s.items).flat();

        const parsedItems = skillItems
          .filter(item => item !== null)
          .flatMap(item => {
            try {
              return JSON.parse(item);
            } catch (e) {
              console.error('Invalid JSON:', item);
              return [];
            }
          });
        res.skills = skills.map(s => ({
          field: s.field,
          items: parsedItems,
        }))
      }
      return res;
    } catch (error) {
      console.error("getSavedData error:", error);
      return {};
    }
  };


  const contextValues = useMemo(() => ({
    insertPersonalDetails: d => insertData("users", d, false, ["auth_id"]),
    insertURLs: d => insertData("urls", d, true, ["user_id", "url"]),
    insertEducations: d => insertData("educations", d, true, ["user_id", "university", "degree", "start_year", "end_year"]),
    insertExperiences: d => insertData("experiences", d, true, ["user_id", "company_name", "position", "location", "start_date", "end_date"]),
    insertAchievements: d => insertData("achievements", d, true, ["user_id", "achievement", "field", "date"]),
    insertSkills: d => insertData("skills", d, true, ["user_id", "field","items"]),
    insertPassions: d => insertData("passions", d, true, ["user_id", "passion"]),
    insertLanguages: d => insertData("languages", d, true, ["user_id", "language"]),
    insertOpenSourceWork: d => insertData("open_source_work", d, true, ["user_id", "project_name", "role", "link"]),
    insertCertificates: d => insertData("certificates", d, true, ["user_id", "certificate", "subject", "date"]),
    insertExperties: d => insertData("industry_expertise", d, true, ["user_id", "tech", "value"]),
    insertMyTime: d => insertData("my_time", d, true, ["user_id", "activity", "value"]),
    insertStrengths: d => insertData("strengths", d, true, ["user_id", "title", "description"]),
    insertExperienceAchievements: d => insertData("experience_achievements", d, true, ["experience_id", "achievement"]),
    insertTrainings: d => insertData("trainings", d, true, ["user_id", "title", "organization", "year", "location"]),
    insertAwards: d => insertData("awards", d, true, ["user_id", "title", "organization", "year"]),
    retriveData,
    uploadFile: uploadFileWithProgress,
    getFiles,
    getSavedData,
  }), [
    insertData,
    uploadFileWithProgress,
    getFiles,
    getSavedData,
    retriveData
  ])

  return (
    <SupabaseContext.Provider value={contextValues}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
export const useSupabase = () => useContext(SupabaseContext);
