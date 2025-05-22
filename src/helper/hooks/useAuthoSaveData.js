import { useCallback } from "react";
import { useLayout } from "../../provider/layoutProvider";
import { useSupabase } from "../../provider/supabaseProvider";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

const useAutoSave = () => {
  const { liveDetails } = useLayout();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { layout_type, layout_id } = useParams();

  const {
    insertPersonalDetails,
    insertURLs,
    insertEducations,
    insertExperiences,
    insertExperienceAchievements,
    insertAchievements,
    insertStrengths,
    insertCertificates,
    insertLanguages,
    insertExperties,
    insertOpenSourceWork,
    insertPassions,
    insertTrainings,
    insertAwards,
    insertMyTime
  } = useSupabase();

  const filterEmptyItems = (arr) =>
    (arr || []).filter(item =>
      Object.values(item).some(val => !!val?.toString().trim())
    );

  return useCallback(async (fields_to_save = {}) => {
    console.log("Saving fields:", Object.keys(fields_to_save).join(", "));

    try {
      if (!user) {
        const confirm = window.confirm("You are not logged in. Do you want to save your data?");
        if (confirm) {
          navigate(`/redirecting?redirectTo=/${layout_type}/${layout_id}`);
        } else {
          alert("Data not saved.");
        }
        return;
      }

      if (!user?.id || !liveDetails) return;

      const {
        personalDetails,
        summary,
        educations,
        experiences,
        achievements,
        strengths,
        certificates,
        languages,
        industryExpertise,
        openSourceWork,
        passions,
        awards,
        trainings,
        my_time,
      } = liveDetails;

      let userId;

      const savePersonalDetails = async () => {
        const hasData = Object.values(personalDetails).some(val => !!val?.toString().trim());
        if (!hasData) return null;

        const payload = {
          ...personalDetails,
          auth_id: user.id,
          summary,
        };

        const urls = (payload.urls || []).filter(u => u.value?.trim());
        delete payload.urls;

        const res = await insertPersonalDetails(payload);
        const uid = res?.[0]?.id;
        if (!uid) throw new Error("User ID missing");

        if (urls.length > 0) {
          await insertURLs(urls.map(u => ({ url: u.value.trim(), user_id: uid })));
        }

        return uid;
      };

      if (fields_to_save.personalDetails || fields_to_save.summary) {
        userId = await savePersonalDetails();
      }

      // Ensure userId is always available
      if (!userId) {
        const res = await insertPersonalDetails({
          ...personalDetails,
          auth_id: user.id,
          summary,
        });
        userId = res?.[0]?.id;
        if (!userId) throw new Error("User ID missing");
      }

      const fieldMap = {
        educations: { data: educations, insert: insertEducations },
        achievements: { data: achievements, insert: insertAchievements },
        strengths: { data: strengths, insert: insertStrengths },
        certificates: { data: certificates, insert: insertCertificates },
        languages: { data: languages, insert: insertLanguages },
        industryExpertise: { data: industryExpertise, insert: insertExperties },
        openSourceWork: { data: openSourceWork, insert: insertOpenSourceWork },
        passions: { data: passions, insert: insertPassions },
        awards: { data: awards, insert: insertAwards },
        trainings: { data: trainings, insert: insertTrainings },
        my_time: {
          data: my_time,
          insert: (values) =>
            insertMyTime(values.map(m => ({
              value: m.value,
              activity: m.activity,
              user_id: userId,
            }))),
        },
      };

      for (const [key, { data, insert }] of Object.entries(fieldMap)) {
        if (fields_to_save[key]) {
          const filtered = filterEmptyItems(data);
          if (filtered.length > 0) {
            await insert(filtered.map(i => ({ ...i, user_id: userId })));
          }
        }
      }

      // Special handling for experiences + nested achievements
      if (fields_to_save.experiences) {
        const validExperiences = filterEmptyItems(
          (experiences || []).map(({ achievements, ...rest }) => rest)
        );
        if (validExperiences.length > 0) {
          const inserted = await insertExperiences(
            validExperiences.map(e => ({ ...e, user_id: userId }))
          );

          const expIds = inserted.map(e => e.id);

          const flattenedAchievements = (experiences || []).flatMap((e, idx) =>
            (e.achievements || [])
              .filter(a => a?.value?.trim())
              .map(a => ({
                experience_id: expIds[idx],
                achievement: a.value.trim(),
              }))
          );

          if (flattenedAchievements.length > 0) {
            await insertExperienceAchievements(flattenedAchievements);
          }
        }
      }

      console.log("Successfully saved:", Object.keys(fields_to_save).join(", "));
    } catch (err) {
      console.error("Auto-save error:", err);
    }
  }, [liveDetails, user]);
};

export default useAutoSave;
