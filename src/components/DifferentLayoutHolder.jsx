import { memo, useEffect, useState } from "react";
import styled, { keyframes, css, useTheme } from "styled-components";
import { GridTwo } from "./layouts/input-layout/GridCards";
import { H2, H3, Hspace } from "./CustomComponents";
import { useNavigate } from "react-router-dom";
import { LineDivider } from "./Divider/TransparentDividers";
import { professionalTemplates } from "../static-data/professional-templates";

const slideIn = keyframes`
  from {
    right: -500px;
    opacity: 0;
  }
  to {
    right: 10px;
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    right: 10px;
    opacity: 1;
  }
  to {
    right: -500px;
    opacity: 0;
  }
`;

const Wrapper = styled.div.withConfig({ shouldForwardProp: (prop) => !['isOpen', 'backgroundColor'].includes(prop) })`
  width: 100%;
  max-width: 500px;
  background: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.background || "#222"};
  padding: 1rem;
  position: fixed;
  top: 16%;
  z-index: 999;
  box-shadow: -8px 0 15px rgba(0, 0, 0, 0.25), 0 8px 15px rgba(0, 0, 0, 0.25);
  animation: ${({ isOpen }) =>
    isOpen
      ? css`${slideIn} 0.4s ease-out forwards`
      : css`${slideOut} 0.4s ease-in forwards`};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;
const ScrollableWrapper=styled.div`
  max-height:100vh;
  height:70vh;
  overflow-y: auto;
`

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    cursor: pointer;
    position:relative;
    transition: 0.3s all ease-in-out;
    &:hover {
        opacity: 0.7;
        transform: translateY(-4px);
    }
    min-height:150px;
    padding:18px;
    border:1px solid #d5dfdf;
    border-radius:12px;
    background:#fff;
    color:#172f41;
    p{margin:7px 0;color:#647681;font-size:.75rem;line-height:1.5}
    span{margin-top:auto;color:#4f606a;font-size:.68rem;font-weight:750}
`;

const stableTemplateIds = new Set(["healthcare-leader", "gcc-photo-clinical", "doctor-specialist"]);

const DifferentLayoutHolder = memo(({ isOpen, onHide }) => {
  const [visible, setVisible] = useState(isOpen);
  const theme = useTheme()
  const navigate = useNavigate()
  const handleLayoutClick = (category, index) => {
    try {
      navigate(`/build-resume/${category}/${index}`)
      onHide()
    } catch (error) {
      console.log("error while changing layout", error)
    }
  }
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      // delay unmount to allow animation
      const timeout = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <Wrapper isOpen={isOpen}>
      <H2>Choose a CV Format</H2>
      <LineDivider backgroundColor={theme.colors.text} />
      <Hspace height="10px"/>
      <ScrollableWrapper>
        <GridTwo>
          {professionalTemplates.filter((template) => stableTemplateIds.has(template.id)).map((template) => {
            return <ImageWrapper key={template.id} onClick={() => handleLayoutClick(template.layoutType, template.layoutId)}>
              <H3>{template.name}</H3>
              <p>{template.description}</p>
              <span>Stable A4 · Neutral · {template.photoReady ? "Photo optional" : "ATS-first"}</span>
            </ImageWrapper>;
          })}
        </GridTwo>
      </ScrollableWrapper>

    </Wrapper>
  );
})

export default DifferentLayoutHolder;
