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
  const { insertPersonalDetails, insertURLs } = useSupabase()
  const{user}=useAuth()
  const saveData = async () => {
    const personalDetails = liveDetails.personalDetails
    const summary=liveDetails.summary
    console.log("summary",summary)
    personalDetails.auth_id=user.id
    personalDetails.summary=summary
    let urls = personalDetails.urls
    delete personalDetails.urls
    let res = await insertPersonalDetails(personalDetails)
    const userId = res[0]["id"]
    const urlsWithUserId = urls.map(url => ({
      url: url.value,
      user_id: userId,
    }));
    res = insertURLs(urlsWithUserId)
    console.log(res)

  }



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
