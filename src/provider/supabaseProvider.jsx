import { createContext, useContext } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "./AuthProvider";

const SupabaseContext = createContext();

const SupabaseProvider = ({ children }) => {
    const { user } = useAuth();

    const insertData = async (table, data) => {
        try {
            const { data: res, error } = await supabase.from(table).insert(data).select("id");
            if (error) throw error;
            console.log(`Inserted into ${table}:`, res);
            return res;
        } catch (error) {
            console.error(`Insert error in table "${table}":`, error);
            return null;
        }
    };

    const retriveData = async (table, fields = "*") => {
        try {
            const { data: res, error } = await supabase
                .from(table)
                .select(fields);
    
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
          console.log("user id",userId)
          if (!userId) return console.log("user id is null");
      
          const { data, error } = await supabase
            .storage
            .from("files") // bucket name only
            .list(`images/${userId}`); // path inside the bucket
      
          if (error) throw error;
        //   const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
        //   const bucketURL = `${supabaseURL}/storage/v1/object/sign/files/images/${user.id}`;
          const fileURLS=[]
          for(const file of data){
            const{data:signedData,error:signedError}=await supabase.storage.from("files").createSignedUrl(`images/${user.id}/${file.name}`, 60 * 60); // 1 hour
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
      
      
    const values = {
        insertPersonalDetails: (details) => insertData("users", details),
        insertURLs: (urls) => insertData("urls", urls),
        insertEducations: (educations) => insertData("educations", educations),
        insertExperiences: (experiences) => insertData("experiences", experiences),
        insertAchievements: (achievements) => insertData("achievements", achievements),
        insertSkills: (skills) => insertData("skills", skills),
        insertPassions: (passions) => insertData("passions", passions),
        insertLanguages: (languages) => insertData("languages", languages),
        insertOpenSourceWork: (projects) => insertData("openSourcework", projects),
        insertCertificates: (certs) => insertData("certificates", certs),
        insertExperties: (expertise) => insertData("expertise", expertise),
        insertMyTime: (entries) => insertData("myTime", entries),
        insertExperienceAchievements: (achievements) => insertData("experience_achievements", achievements),
        retriveData,
        uploadFile:uploadFileWithProgress,
        getFiles
    };

    return (
        <SupabaseContext.Provider value={values}>
            {children}
        </SupabaseContext.Provider>
    );
};

export default SupabaseProvider;
export const useSupabase = () => useContext(SupabaseContext);
