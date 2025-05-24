import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Hspace } from "../components/CustomComponents";
import LayoutInputField from "../components/layouts/input-layout/LayoutInputField";
import { useLayout } from "../provider/layoutProvider";
import LayoutPreview from "../components/layouts/input-layout/LayoutPreview";
import GeneratePageFixedButtons from "../components/generatePageFixedButton";
import Loading from "../components/Loading";
import useLoadSavedData from "../helper/hooks/useLoadSavedData";
import useAutoSaveWithDiff from "../helper/hooks/useAutoSaveWithDiff";
import DividerProvider from "../provider/DividerProvider";
import DifferentLayoutHolder from "../components/DifferentLayoutHolder";
import useHideOnScroll from "../helper/hooks/useHideOnScroll";
import UploadResumeCard from "../components/UploadResumeCard";

const MainWrapper = styled.section`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  position: relative;
  inset: 0;
  background: ${({ theme }) => theme.colors.bg};
`;

const ResponsiveGrid = styled.div.withConfig({ shouldForwardProp: (prop) => !['isOpen'].includes(prop) })`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;



const GenerateResume = () => {
  const [showIcons, setShowIcons] = useState(false);
  const [isTemplateChangeModelOpen, setIsTemplateChangeModelOpen] = useState(false);
  const { isSavedLoaded } = useLayout();
  const AUTOSAVE_INTERVAL = 1000 * 60;

  useLoadSavedData();
  useAutoSaveWithDiff(AUTOSAVE_INTERVAL);
  useHideOnScroll(setShowIcons)

  const handleShowIcon = useCallback(() => {
    setShowIcons((prev) => !prev)
  }, [showIcons]);

  const openTemplateChangeModal = useCallback(() => {
    setIsTemplateChangeModelOpen((prev) => !prev);
  }, [isTemplateChangeModelOpen,showIcons]);


  if (!isSavedLoaded) {
    return <Loading message="Loading saved records from database" />;
  }

  return (
    <DividerProvider>
      <MainWrapper>
        <Hspace />
        <ResponsiveGrid isOpen={isTemplateChangeModelOpen}>
          {/* {
            !isTemplateChangeModelOpen  && <LayoutInputField />
          } */}
          <LayoutInputField />
          <LayoutPreview />
        </ResponsiveGrid>
        <GeneratePageFixedButtons
          showIcons={showIcons}
          setShowIcons={handleShowIcon}
          setIsTemplateChangeModelOpen={openTemplateChangeModal}
        />
        <UploadResumeCard/>
      </MainWrapper>
      <DifferentLayoutHolder isOpen={isTemplateChangeModelOpen} onHide={openTemplateChangeModal} />

    </DividerProvider>
  );
};


export default GenerateResume;