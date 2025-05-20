import { createContext, useContext } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "./AuthProvider";
import {
  defaultAchievements,
  defaultEducation,
  defaultExperiences,
  defaultSkills,
} from "../components/helper/default_form_value";
import getSelectableFields from "../components/helper/selectableFields";

const SupabaseContext = createContext();

const SupabaseProvider = ({ children }) => {
  const { user } = useAuth();

  const insertData = async (table, data, multiple = false, conflictKeys = []) => {
    try {
      const payload = multiple ? data : [data];
      console.log("payload",payload)
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

  const retriveData = async (table, fields = "*", filters = {}, limit = null, orderBy = null, orderDesc = false) => {
    try {
      let query = supabase.from(table).select(fields);
      Object.entries(filters).forEach(([key, val]) => query = query.eq(key, val));
      if (limit) query = query.limit(limit);
      if (orderBy) query = query.order(orderBy, { ascending: !orderDesc });

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
          return signed.signedUrl;
        })
      );

      return urls.filter(Boolean);
    } catch (err) {
      console.error("Error fetching files:", err.message);
    }
  };

  const getSavedData = async () => {
    try {
      if (!user?.id) return {};

      const selectFields = getSelectableFields();
      selectFields.push("personalDetails");

      const orderBy = ["created_at", true];
      const res = {};

      if (!selectFields.includes("personalDetails")) return res;

      const [personalDetails] = await retriveData("users", "*", { auth_id: user.id }, 1, ...orderBy);
      if (!personalDetails) return {};

      const user_id = personalDetails.id;
      res.personalDetails = personalDetails;

      const fetchWithFallback = async (table, defaultValue, limit = null) => {
        const data = await retriveData(table, "*", { user_id }, limit, ...orderBy);
        return data?.length ? data : defaultValue;
      };

  
      const urls = await fetchWithFallback("urls", [{ value: "" }], 2);
      res.personalDetails={
        ...res.personalDetails,
        urls:urls.map((u,_)=>({value:u.url}))
      }

      

      if (selectFields.includes("educations")) {
        res.educations = await fetchWithFallback("educations", defaultEducation, 3);
      }

      if (selectFields.includes("achievements")) {
        res.achievements = await fetchWithFallback("achievements", defaultAchievements);
      }

      if (selectFields.includes("skills")) {
        const skills = await fetchWithFallback("skills", defaultSkills);
        const skillIds = skills.map(s => s.id).filter(Boolean);

        if (skillIds.length > 0) {
          const { data: itemsData, error } = await supabase
            .from("skill_items")
            .select()
            .in("field_id", skillIds);
          if (error) console.error("skill_items fetch error:", error);

          res.skills = skills.map(skill => ({
            ...skill,
            items: (itemsData?.filter(i => i.field_id === skill.id) || []).map(i => ({ value: i.skill }))
          }));
        } else {
          res.skills = skills;
        }
      }

      if (selectFields.includes("experiences")) {
        const experiences = await retriveData("experiences", "*", { user_id }, 5, ...orderBy);
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
        })) || defaultExperiences;
      }
    
      return res;
    } catch (error) {
      console.error("getSavedData error:", error);
      return {};
    }
  };

  const values = {
    insertPersonalDetails: d => insertData("users", d, false, ["auth_id"]),
    insertURLs: d => insertData("urls", d, true, ["user_id", "url"]),
    insertEducations: d => insertData("educations", d, true, ["user_id", "university", "degree", "start_year", "end_year"]),
    insertExperiences: d => insertData("experiences", d, true, ["user_id", "company_name", "position", "location", "start_date", "end_date"]),
    insertAchievements: d => insertData("achievements", d, true, ["user_id", "achievement", "field", "date"]),
    insertSkills: d => insertData("skills", d, true, ["user_id", "field"]),
    insertSkillItem: d => insertData("skill_items", d, true, ["field_id", "skill"]),
    insertPassions: d => insertData("passions", d, true, ["user_id"]),
    insertLanguages: d => insertData("languages", d, true, ["user_id", "language"]),
    insertOpenSourceWork: d => insertData("openSourcework", d, true, ["user_id"]),
    insertCertificates: d => insertData("certificates", d, true, ["user_id"]),
    insertExperties: d => insertData("expertise", d, true, ["user_id"]),
    insertMyTime: d => insertData("myTime", d, true, ["user_id"]),
    insertExperienceAchievements: d => insertData("experience_achievements", d, true, ["experience_id", "achievement"]),
    insertTrainings: d => insertData("trainings", d, true, ["user_id", "title", "organization", "year"]),
    retriveData,
    uploadFile: uploadFileWithProgress,
    getFiles,
    getSavedData,
  };

  return (
    <SupabaseContext.Provider value={values}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
export const useSupabase = () => useContext(SupabaseContext);
