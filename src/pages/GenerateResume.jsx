import { useCallback, useState } from "react";
import styled from "styled-components";
import { Hspace } from "../components/CustomComponents";
import { useLayout } from "../provider/layoutProvider";
import LayoutPreview from "../components/layouts/input-layout/LayoutPreview";
import GeneratePageFixedButtons from "../components/generatePageFixedButton";
import Loading from "../components/Loading";
import useLoadSavedData from "../helper/hooks/useLoadSavedData";
import useAutoSaveWithDiff from "../helper/hooks/useAutoSaveWithDiff";
import DividerProvider from "../provider/DividerProvider";
import DifferentLayoutHolder from "../components/DifferentLayoutHolder";
import useHideOnScroll from "../helper/hooks/useHideOnScroll";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiShield } from "react-icons/fi";
import "../css/resume-editor.css";
import "../css/download-experience.css";

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
  const [showIcons, setShowIcons] = useState(true);
  const [isTemplateChangeModelOpen, setIsTemplateChangeModelOpen] = useState(false);
  const [isAIGenerated] = useState(() => Boolean(sessionStorage.getItem("resuai_improved_cv")));
  const { isSavedLoaded } = useLayout();
  const { layout_type, layout_id } = useParams();
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

  if (!isAIGenerated) return <Navigate to="/ats-checker" replace />;

  return (
    <DividerProvider>
      <MainWrapper>
        <div className="resume-studio">
          <header className="studio-header">
            <div>
              <Link to="/templates" className="studio-back"><FiArrowLeft /> All templates</Link>
              <span className="studio-eyebrow">HEALTHCARE CV STUDIO</span>
              <h1>Your AI-improved healthcare CV is ready</h1>
              <p>AI populated this template from your uploaded CV. Review the preview and return to the ATS report if any suggestion needs correction.</p>
            </div>
            <div className="studio-meta">
              <span><FiCheckCircle /> Autosave enabled</span>
              <span><FiShield /> Private workspace</span>
              <strong>{layout_type} · Template {layout_id}</strong>
            </div>
          </header>
          <div className="studio-progress" aria-label="Resume workflow">
            <span><b>1</b> AI completed</span><i></i><span className="active"><b>2</b> Review</span><i></i><span><b>3</b> Download</span>
          </div>
          <div className="ai-ready-banner"><div><FiCheckCircle/><span><strong>Your complete CV is ready to shine</strong><small>Review every page, then use the green button to download the full PDF.</small></span></div><Link to="/ats-checker">Back to ATS suggestions</Link></div>
          <ResponsiveGrid className="preview-only" isOpen={isTemplateChangeModelOpen}>
          {/* {
            !isTemplateChangeModelOpen  && <LayoutInputField />
          } */}
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
