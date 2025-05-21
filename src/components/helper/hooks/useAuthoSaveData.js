import { useCallback } from "react";
import  {useLayout} from "../../../provider/layoutProvider";
import  {useSupabase}  from "../../../provider/supabaseProvider";
import  {useAuth}  from "../../../provider/AuthProvider";

const  useAutoSave = () => {
  const { liveDetails } = useLayout();
  const { user } = useAuth();
  const {
    insertPersonalDetails,
    insertURLs,
    insertEducations,
    insertExperiences,
    insertExperienceAchievements,
    insertAchievements,
    insertStrengths,
    insertCertificates
  } = useSupabase();

  return useCallback(async () => {
    try {
      if (!user?.id || !liveDetails) return;

      const { personalDetails, summary, educations, experiences, achievements, strengths,certificates } = liveDetails;
      const validPersonalDetails = Object.values(personalDetails).some(val => !!val?.toString().trim());
      if (!validPersonalDetails) return;
      const payload = {
        ...personalDetails,
        auth_id: user.id,
        summary,
      };

      const urls = (payload.urls || []).filter(u => u.value?.trim());
      delete payload.urls;

      const hasPersonalDetails = Object.values(payload).some(val => !!val?.toString().trim());
      if (!hasPersonalDetails) return;

      const res = await insertPersonalDetails(payload);
      const userId = res?.[0]?.id;
      if (!userId) throw new Error("User ID missing");

      if (urls.length > 0) {
        await insertURLs(urls.map(u => ({ url: u.value.trim(), user_id: userId })));
      }

      const validEducations = (educations || []).filter(e => Object.values(e).some(v => !!v?.toString().trim()));
      if (validEducations.length > 0) {
        await insertEducations(validEducations.map(e => ({ ...e, user_id: userId })));
      }

      const validExperiences = (experiences || []).filter(e => Object.entries(e).some(([k, v]) => k !== "achievements" && !!v?.toString().trim()));
      if (validExperiences.length > 0) {
        const expPayload = validExperiences.map(({ achievements, ...rest }) => ({ ...rest, user_id: userId }));
        expPayload.forEach(e => delete e.id);

        const inserted = await insertExperiences(expPayload);
        const expIds = inserted.map(e => e.id);

        const flattenedAchievements = validExperiences.flatMap((e, idx) =>
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

      const validAchievements = (achievements || []).filter(a => Object.values(a).some(v => !!v?.toString().trim()));
      if (validAchievements.length > 0) {
        await insertAchievements(validAchievements.map(a => ({ ...a, user_id: userId })));
      }

      const validStrengths = (strengths || []).filter(s => Object.values(s).some(v => !!v?.toString().trim()));
      if (validStrengths.length > 0) {
        await insertStrengths(validStrengths.map(s => ({ ...s, user_id: userId })));
      }
      const validCertificates = (certificates || []).filter(c => Object.values(c).some(v => !!v?.toString().trim()));
      if (validCertificates.length > 0) {
        await insertCertificates(validCertificates.map(c => ({ ...c, user_id: userId })));
      }
      console.log("All valid data saved successfully.");
    } catch (err) {
      console.error("Error in saveData:", err);
    }
  }, [liveDetails, user]);
};

export default useAutoSave;