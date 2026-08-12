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
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiEdit3, FiShield } from "react-icons/fi";
import "../css/resume-editor.css";

const MainWrapper = styled.section`
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  inset: 0;
  background: ${({ theme }) => theme.colors.bg};
`;

const ResponsiveGrid = styled.div.withConfig({ shouldForwardProp: (prop) => !['isOpen'].includes(prop) })`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.25rem;
  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(500px, .95fr);
  }
`;



const GenerateResume = () => {
  const [showIcons, setShowIcons] = useState(false);
  const [isTemplateChangeModelOpen, setIsTemplateChangeModelOpen] = useState(false);
  const [isAIGenerated] = useState(() => sessionStorage.getItem("resuai_ai_completed") === "true");
  const [showEditor, setShowEditor] = useState(() => sessionStorage.getItem("resuai_ai_completed") !== "true");
  const { isSavedLoaded } = useLayout();
  const { layout_type, layout_id } = useParams();
  const AUTOSAVE_INTERVAL = 1000 * 60;

  useLoadSavedData();
  useAutoSaveWithDiff(AUTOSAVE_INTERVAL);
  useHideOnScroll(setShowIcons)
  useEffect(() => {
    if (isAIGenerated) sessionStorage.removeItem("resuai_ai_completed");
  }, [isAIGenerated]);

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
        <div className="resume-studio">
          <header className="studio-header">
            <div>
              <Link to="/templates" className="studio-back"><FiArrowLeft /> All templates</Link>
              <span className="studio-eyebrow">HEALTHCARE CV STUDIO</span>
              <h1>{isAIGenerated ? "Your AI-improved healthcare CV is ready" : "Build a CV healthcare recruiters can trust"}</h1>
              <p>{isAIGenerated ? "AI has populated this template from your uploaded CV. Review the finished document and edit only if you want to make a correction." : "Show your credentials, clinical competence and patient-care impact while your ATS-friendly document updates alongside you."}</p>
            </div>
            <div className="studio-meta">
              <span><FiCheckCircle /> Autosave enabled</span>
              <span><FiShield /> Private workspace</span>
              <strong>{layout_type} · Template {layout_id}</strong>
            </div>
          </header>
          <div className="studio-progress" aria-label="Resume workflow">
            <span className={isAIGenerated ? "" : "active"}><b>1</b> {isAIGenerated ? "AI completed" : "Add details"}</span><i></i><span className={isAIGenerated ? "active" : ""}><b>2</b> Review</span><i></i><span><b>3</b> Download</span>
          </div>
          {!isAIGenerated ? <UploadResumeCard /> : <div className="ai-ready-banner"><div><FiCheckCircle/><span><strong>Complete CV generated from your upload</strong><small>Review all facts before downloading.</small></span></div><button type="button" onClick={() => setShowEditor(value => !value)}><FiEdit3/>{showEditor ? "Hide details" : "Edit any detail"}</button></div>}
          <ResponsiveGrid className={!showEditor ? "preview-only" : ""} isOpen={isTemplateChangeModelOpen}>
          {/* {
            !isTemplateChangeModelOpen  && <LayoutInputField />
          } */}
          {showEditor ? <LayoutInputField /> : null}
          <LayoutPreview />
          </ResponsiveGrid>
        </div>
        <GeneratePageFixedButtons
          showIcons={showIcons}
          setShowIcons={handleShowIcon}
          setIsTemplateChangeModelOpen={openTemplateChangeModal}
        />
      </MainWrapper>
      <DifferentLayoutHolder isOpen={isTemplateChangeModelOpen} onHide={openTemplateChangeModal} />

    </DividerProvider>
  );
};


export default GenerateResume;
