import { useEffect, useState } from "react";
import styled from "styled-components";
import { Hspace } from "../components/CustomComponents";
import LayoutInputField from "../components/layouts/input-layout/LayoutInputField";
import { useLayout } from "../provider/layoutProvider";
import LayoutPreview from "../components/layouts/input-layout/LayoutPreview";
import { CircularIconHolder } from "../components/elements/resumeSectionWrapper";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import { FaDownLong } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import ToolTip from "../components/Tooltip";
import { useSupabase } from "../provider/supabaseProvider";
import { useAuth } from "../provider/AuthProvider";

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

const FixedIconWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;


`;

const GenerateResume = () => {
  const [showIcons, setShowIcons] = useState(false);
  const { generatePDF, complie_input, liveDetails } = useLayout();
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
  }, [showIcons])



  useEffect(() => {
    const handleUnload = async () => {
      const userId = await insertPersonalDetails(liveDetails.personalDetails)
      localStorage.setItem("userId", userId)
    }
    window.addEventListener("onbeforeunload", handleUnload);
    return () => {
      window.removeEventListener("onbeforeunload", handleUnload);
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

  const saveData = async () => {
    try {
      const { personalDetails, summary, educations, experiences, achievements, skills } = liveDetails;

      // Add auth_id and summary to personalDetails
      const payloadPersonalDetails = {
        ...personalDetails,
        auth_id: user.id,
        summary,
      };

      // Extract and remove urls from personalDetails
      const urls = payloadPersonalDetails.urls?.filter(u => u.value?.trim()) || [];
      delete payloadPersonalDetails.urls;

      // Insert personal details
      let res = await insertPersonalDetails(payloadPersonalDetails);
      const userId = res[0]?.id;
      if (!userId) throw new Error("User ID not returned after inserting personal details.");

      // Insert URLs
      const urlsWithUserId = urls.map(url => ({
        url: url.value.trim(),
        user_id: userId,
      }));
      await insertURLs(urlsWithUserId);

      // Insert Educations
      const educationWithUserId = educations?.map(edu => ({
        ...edu,
        user_id: userId,
      })) || [];
      await insertEducations(educationWithUserId);

      // Prepare Experiences and Achievements
      const experiencesWithAchievements = experiences || [];
      const achievementsPerExperience = experiencesWithAchievements.map(exp => exp.achievements || []);
      const experiencesPayload = experiencesWithAchievements.map(({ achievements, id, ...rest }) => ({
        ...rest,
        user_id: userId,
      }));

      // Insert Experiences
      res = await insertExperiences(experiencesPayload);
      const experienceIds = res.map(e => e.id);

      // Flatten Achievements with matching experience_id
      const experienceAchievements = achievementsPerExperience.flatMap((achievementArray, idx) =>
        achievementArray
          ?.filter(a => a.value?.trim())
          .map(a => ({
            experience_id: experienceIds[idx],
            achievement: a.value.trim(),
          })) || []
      );

      await insertExperienceAchievements(experienceAchievements);

      // Insert Global Achievements
      const globalAchievements = achievements.map((achievement, _) => ({ ...achievement, user_id: userId }))
      await insertAchievements(globalAchievements);

      // Insert skills (just the fields)
      const skillsFields = await insertSkills(skills.map(skill => ({
        field: skill.field,
        user_id: userId
      })));

      const skillFieldIds = skillsFields.map(skill => skill.id);

      // Prepare skill items (attached to their respective skill field)
      const skillItemsWithFieldId = (skills || []).flatMap((skill, index) => {
        return (skill.items || [])
          .filter(item => item?.value?.trim())
          .map(item => ({
            field_id: skillFieldIds[index],
            skill: item.value.trim()
          }));
      });

      console.log("skillsWithId", skillItemsWithFieldId);

      // Insert skill items
      await insertSkillItem(skillItemsWithFieldId);

      console.log("All data saved successfully.");

    } catch (error) {
      console.error("Error in saveData:", error);
    }
  };




  return (
    <MainWrapper>
      <Hspace />
      <ResponsiveGrid>
        <LayoutInputField />
        <LayoutPreview />
      </ResponsiveGrid>

      <FixedIconWrapper>
        <ToolTip text="Show more icons">
          <CircularIconHolder
            backgroundColor="#1A73E8"
            onClick={() => setShowIcons(prev => !prev)}
          >
            {showIcons ? <MdExpandLess /> : <MdExpandMore />}
          </CircularIconHolder>
          <button onClick={saveData}>Save data</button>
        </ToolTip>


        {showIcons && (
          <>
            <ToolTip text="Download Resume">
              <CircularIconHolder
                backgroundColor="#34A853"
                onClick={generatePDF}
              >
                <FaDownLong color="white" />
              </CircularIconHolder>
            </ToolTip>
            <ToolTip text="Compile Now">
              <CircularIconHolder
                backgroundColor="#FBBC05"
                onClick={complie_input}
              >
                <FaCogs color="white" />
              </CircularIconHolder>
            </ToolTip>
          </>
        )}
      </FixedIconWrapper>

    </MainWrapper>
  );
};

export default GenerateResume;
