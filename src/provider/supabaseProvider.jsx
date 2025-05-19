import { createContext, useContext } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "./AuthProvider";
import { defaultAchievements, defaultEducation, defaultExperiences, defaultSkills } from "../components/helper/default_form_value";

const SupabaseContext = createContext();

const SupabaseProvider = ({ children }) => {
  const { user } = useAuth();

  const insertData = async (table, data, insertMultiple = false) => {
    try {
      if (insertMultiple) {
        // Expecting 'data' to be an array of objects
        const { data: res, error } = await supabase
          .from(table)
          .insert(data) // This handles bulk insert
          .select("id");
        if (error) throw error;
        console.log(`Inserted multiple records into ${table}:`, res);
        return res;
      } else {
        // Expecting 'data' to be a single object
        const { data: res, error } = await supabase
          .from(table)
          .insert([data])
          .select("id");
        if (error) throw error;
        console.log(`Inserted into ${table}:`, res);
        return res;
      }
    } catch (error) {
      console.error(`Insert error in table "${table}":`, error);
      return null;
    }
  };


  const retriveData = async (table, fields = "*", filters = {}, limit = null, orderBy = null,
    orderDesc = false) => {
    try {
      let query = supabase.from(table).select(fields);

      // Apply filters
      for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
      }
      if (limit != null) {
        query = query.limit(limit)
      }
      if (orderBy) {
        query = query.order(orderBy, { ascending: !orderDesc });
      }

      const { data: res, error } = await query;

      if (error) {
        console.log("Error retrieving data:", error);
        return null;
      }

      console.log(`Retrieved from ${table}:`, res);
      return res;
    } catch (error) {
      console.log("Unexpected error while retrieving records from server", error);
      return null;
    }
  };


  const uploadFileWithProgress = async (file, onProgress) => {
    try {
      // Validate if file is provided
      if (!file) return console.log("No file provided");

      if (!user?.id) return console.log("User not logged in");

      // Define your Supabase storage bucket and file path
      const bucketName = "files";
      const filePath = `images/${user.id}/${file.name}`;

      // Step 1: Get a signed upload URL from Supabase
      /*
      You're calling Supabase's createSignedUploadUrl() method to get a temporary signed URL that
       lets you upload a file securely to Supabase Storage without needing public write access.
      */
      const { data: urlData, error: urlError } = await supabase
        .storage
        .from(bucketName)
        .createSignedUploadUrl(filePath);


      if (urlError) throw urlError;

      // Step 2: Use XMLHttpRequest to upload the file with progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", urlData.signedUrl, true); // Use PUT method for the signed URL
      // Step 3: Monitor upload progress and call callback
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete); // Call the callback with progress %
        }
      };

      // Step 4: Handle successful upload
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log("Upload complete");
        } else {
          console.error("Upload failed", xhr.responseText);
        }
      };

      // Step 5: Handle error during upload
      xhr.onerror = () => {
        console.error("Error during upload");
      };

      // Step 6: Send the file
      xhr.send(file);

    } catch (error) {
      console.log("Upload error:", error.message);
    }
  };

  const getFiles = async () => {
    try {
      const userId = user?.id;
      console.log("user id", userId)
      if (!userId) return console.log("user id is null");

      const { data, error } = await supabase
        .storage
        .from("files") // bucket name only
        .list(`images/${userId}`); // path inside the bucket

      if (error) throw error;
      //   const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
      //   const bucketURL = `${supabaseURL}/storage/v1/object/sign/files/images/${user.id}`;
      const fileURLS = []
      for (const file of data) {
        const { data: signedData, error: signedError } = await supabase.storage.from("files").createSignedUrl(`images/${user.id}/${file.name}`, 60 * 60); // 1 hour
        if (signedError) {
          console.error("Error generating signed URL for", file.name, signedError.message);
          continue;
        }
        fileURLS.push(signedData.signedUrl)
      }
      return fileURLS

    } catch (error) {
      console.log("Error while getting files from server:", error.message);
    }
  };

 const getSavedData = async () => {
  try {
    if (!user?.id) return {};

    const orderBy = ["created_at", true];
    const res = {};
    
    const [personalDetails] = await retriveData("users", "*", { auth_id: user.id }, 1, ...orderBy);
    if (!personalDetails) return {};

    const user_id = personalDetails.id;
    res.personalDetails = personalDetails;

    const fetchWithFallback = async (table, defaultValue, limit = null) => {
      const data = await retriveData(table, "*", { user_id }, limit, ...orderBy);
      return data.length > 0 ? data : defaultValue;
    };

    res.urls = await fetchWithFallback("urls", [{ value: "" }], 2);
    res.educations = await fetchWithFallback("educations", defaultEducation, 3);
    res.achievements = await fetchWithFallback("achievements", defaultAchievements);
    res.skills = await fetchWithFallback("skills", defaultSkills);

    // Get experiences and their achievements
    const experiences = await retriveData("experiences", "*", { user_id }, 5, ...orderBy);
    const experienceIds = experiences.map(e => e.id);

    const { data: achievementsData, error } = await supabase
      .from("experience_achievements")
      .select("*")
      .in("experience_id", experienceIds);

    if (error) console.log("Error fetching experience achievements:", error);

    const experienceMap = experiences.map(exp => {
      const relatedAchievements = achievementsData
        ?.filter(a => a.experience_id === exp.id)
        .map(a => ({ value: a.achievement })) || [];

      return {
        company_name: exp.company_name || "",
        position: exp.position || "",
        about_company: exp.about_company || "",
        start_date: exp.start_date || "",
        end_date: exp.end_date || "",
        location: exp.location || "",
        achievements: relatedAchievements.length > 0 ? relatedAchievements : [{ value: "" }]
      };
    });

    res.experiences = experienceMap.length > 0 ? experienceMap : defaultExperiences

    return res;

  } catch (error) {
    console.log("Error in getSavedData:", error);
    return {};
  }
};


  const values = {
    insertPersonalDetails: (details) => insertData("users", details),
    insertURLs: (urls) => insertData("urls", urls, true),
    insertEducations: (educations) => insertData("educations", educations, true),
    insertExperiences: (experiences) => insertData("experiences", experiences, true),
    insertAchievements: (achievements) => insertData("achievements", achievements, true),
    insertSkills: (skills) => insertData("skills", skills, true),
    insertPassions: (passions) => insertData("passions", passions, true),
    insertLanguages: (languages) => insertData("languages", languages, true),
    insertOpenSourceWork: (projects) => insertData("openSourcework", projects, true),
    insertCertificates: (certs) => insertData("certificates", certs),
    insertExperties: (expertise) => insertData("expertise", expertise, true),
    insertMyTime: (entries) => insertData("myTime", entries, true),
    insertExperienceAchievements: (achievements) => insertData("experience_achievements", achievements, true),
    insertSkillItem:(items)=>insertData("skill_items",items,true),
    retriveData,
    uploadFile: uploadFileWithProgress,
    getFiles,
    getSavedData
  };

  return (
    <SupabaseContext.Provider value={values}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
export const useSupabase = () => useContext(SupabaseContext);
