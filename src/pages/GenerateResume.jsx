import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Hspace } from "../components/CustomComponents";
import LayoutInputField from "../components/layouts/input-layout/LayoutInputField";
import { useLayout } from "../provider/layoutProvider";
import LayoutPreview from "../components/layouts/input-layout/LayoutPreview";
import GeneratePageFixedButtons from "../components/generatePageFixedButton";
import Loading from "../components/Loading";
import useAutoSave from "../components/helper/hooks/useAuthoSaveData";
import useLoadSavedData from "../components/helper/hooks/useLoadSavedData";

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




  useEffect(() => {
    const handleUnload = async (e) => {

    };
    const handleScroll = () => { setShowIcons(false) };
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("beforeunload", handleUnload);

    }
  }, [])


  useLoadSavedData()
  const saveData = useAutoSave()

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