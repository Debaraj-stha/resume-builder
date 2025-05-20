import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Hspace } from "../components/CustomComponents";
import LayoutInputField from "../components/layouts/input-layout/LayoutInputField";
import { useLayout } from "../provider/layoutProvider";
import LayoutPreview from "../components/layouts/input-layout/LayoutPreview";
import { useSupabase } from "../provider/supabaseProvider";
import { useAuth } from "../provider/AuthProvider";
import GeneratePageFixedButtons from "../components/generatePageFixedButton";
import Loading from "../components/Loading";

const MainWrapper = styled.section`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  position: relative;
  inset: 0;
  background: ${({ theme }) => theme.colors.bg};
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;



const GenerateResume = () => {
  const [showIcons, setShowIcons] = useState(false);
  const { isSavedLoaded, liveDetails } = useLayout();
  const handleScroll = () => {
    //hiding the icons on scroll
    setShowIcons(prev => {
      if (prev) return false;
      return prev;
    });
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])




  useEffect(() => {
    const handleUnload = async (e) => {
      const userId = await insertPersonalDetails(liveDetails.personalDetails)
      localStorage.setItem("userId", userId)
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const {
    insertPersonalDetails,
    insertURLs,
    insertEducations,
    insertExperiences,
    insertExperienceAchievements,
    insertAchievements,
    insertSkills,
    insertSkillItem
  }
    = useSupabase()

  const { user } = useAuth()

  const saveData = useCallback(async () => {
    try {
      if (!user?.id || !liveDetails) {
        console.warn("User or liveDetails missing");
        return;
      }

      const { personalDetails, summary, educations, experiences, achievements, skills } = liveDetails;

      // Add auth_id and summary to personalDetails
      const payloadPersonalDetails = {
        ...personalDetails,
        auth_id: user.id,
        summary,
      };

      // Extract and remove URLs
      const urls = (payloadPersonalDetails.urls || []).filter(u => u.value?.trim());
      delete payloadPersonalDetails.urls;

      // Only insert personal details if there's meaningful data
      const hasPersonalDetails = Object.values(payloadPersonalDetails).some(val => !!val?.toString().trim());
      if (!hasPersonalDetails) {
        console.warn("Skipping personalDetails insert: No valid data");
        return;
      }

      // Insert personal details
      let res = await insertPersonalDetails(payloadPersonalDetails);
      if (!res) throw new Error("res is null");
      const userId = res[0]?.id;
      if (!userId) throw new Error("User ID not returned after inserting personal details.");

      // Insert URLs if any valid
      if (urls.length > 0) {
        const urlsWithUserId = urls.map(url => ({
          url: url.value.trim(),
          user_id: userId,
        }));
        await insertURLs(urlsWithUserId);
      }

      // Insert Educations if valid
      const validEducations = (educations || []).filter(edu =>
        Object.values(edu).some(val => !!val?.toString().trim())
      );
      if (validEducations.length > 0) {
        const educationWithUserId = validEducations.map(edu => ({
          ...edu,
          user_id: userId,
        }));
        await insertEducations(educationWithUserId);
      }

      // Insert Experiences & experience-level achievements
      const validExperiences = (experiences || []).filter(exp =>
        Object.entries(exp).some(([k, v]) => k !== "achievements" && !!v?.toString().trim())
      );

      if (validExperiences.length > 0) {
        const experienceAchievements = validExperiences.map(exp => exp.achievements || []);
        const experiencesPayload = validExperiences.map(({ achievements, ...rest }) => ({
          ...rest,
          user_id: userId,
        }));
        experiencesPayload.map((experience,_)=>delete experience?.id)

        res = await insertExperiences(experiencesPayload);
        const experienceIds = res.map(e => e.id);

        const flattenedAchievements = experienceAchievements.flatMap((achArr, idx) =>
          achArr
            .filter(a => a?.value?.trim())
            .map(a => ({
              experience_id: experienceIds[idx],
              achievement: a.value.trim()
            }))
        );

        if (flattenedAchievements.length > 0) {
          await insertExperienceAchievements(flattenedAchievements);
        }
      }

      // Insert global achievements
      const validAchievements = (achievements || []).filter(a =>
        Object.values(a).some(val => !!val?.toString().trim())
      );

      if (validAchievements.length > 0) {
        const globalAchievements = validAchievements.map(achievement => ({
          ...achievement,
          user_id: userId
        }));
        await insertAchievements(globalAchievements);
      }

      // Insert Skills & Skill Items
      const validSkills = (skills || []).filter(skill =>
        skill?.field?.trim() || (skill.items || []).some(item => item?.value?.trim())
      );

      if (validSkills.length > 0) {
        const skillsFields = await insertSkills(validSkills.map(skill => ({
          field: skill.field,
          user_id: userId
        })));

        const skillItems = validSkills.flatMap((skill, index) =>
          (skill.items || [])
            .filter(item => item?.value?.trim())
            .map(item => ({
              field_id: skillsFields[index]?.id,
              skill: item.value.trim()
            }))
        );

        if (skillItems.length > 0) {
          await insertSkillItem(skillItems);
        }
      }

      console.log("All valid data saved successfully.");
    } catch (error) {
      console.error("Error in saveData:", error);
    }
  }, [liveDetails, user]);


  const setShowIconsCallback = useCallback(setShowIcons, [])
  //showing loading ui before loading old saved records from database if have
  if (!isSavedLoaded) {
    return <Loading message="Loading saved records from database" />
  }

  return (
    <MainWrapper>
      <Hspace />
      <ResponsiveGrid>
        <LayoutInputField />
        <LayoutPreview />
      </ResponsiveGrid>
      <GeneratePageFixedButtons showIcons={showIcons} setShowIcons={setShowIconsCallback} saveData={saveData} />

    </MainWrapper>
  );
};

export default GenerateResume;
