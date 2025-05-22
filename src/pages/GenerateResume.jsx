import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Hspace } from "../components/CustomComponents";
import LayoutInputField from "../components/layouts/input-layout/LayoutInputField";
import { useLayout } from "../provider/layoutProvider";
import LayoutPreview from "../components/layouts/input-layout/LayoutPreview";
import GeneratePageFixedButtons from "../components/generatePageFixedButton";
import Loading from "../components/Loading";
import useAutoSave from "../helper/hooks/useAuthoSaveData";
import useLoadSavedData from "../helper/hooks/useLoadSavedData";
import useAutoSaveWithDiff from "../helper/hooks/useAutoSaveWithDiff";

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

  const { isSavedLoaded } = useLayout()
  const AUTOSAVE_INTERVAL = 1000 * 60; // 1 minute


 useAutoSaveWithDiff(AUTOSAVE_INTERVAL)
  useEffect(() => {
  
    const handleScroll = () => { setShowIcons(false) };
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)

    }
  }, [])


  useLoadSavedData()


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
      <GeneratePageFixedButtons showIcons={showIcons} setShowIcons={setShowIconsCallback}  />

    </MainWrapper>
  );
};

export default GenerateResume;