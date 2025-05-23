import { memo, useEffect, useState } from "react";
import styled, { keyframes, css, useTheme } from "styled-components";
import { all_layouts_image_map } from "./LayoutImages";
import { GridTwo } from "./layouts/input-layout/GridCards";
import { H2, H3, Hspace } from "./CustomComponents";
import { useNavigate } from "react-router-dom";
import { LineDivider } from "./Divider/TransparentDividers";

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
     &:before {
    content: "";
    position: absolute;
    left: 0;
    background: red;
    top: 0;
    width: 100%;
    height: 200px;
    z-index: -1;
  }

  img {
    width: 100%;
    object-fit: contain;
    height:100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

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
      <H2>Try Different Resume Layouts</H2>
      <LineDivider backgroundColor={theme.colors.text} />
      <Hspace height="10px"/>
      <ScrollableWrapper>
        <GridTwo>
          {Object.entries(all_layouts_image_map).flatMap(
            ([category, layoutMap], outerIndex) =>
              Object.entries(layoutMap).map(([layoutName, imageSRC], index) => (
                <ImageWrapper key={`${outerIndex}-${index}`} onClick={() => handleLayoutClick(category, index + 1)}>
                  <H3>{category} - {layoutName}</H3>
                  <img src={imageSRC} loading="lazy" alt={`${category} ${layoutName}`} />
                </ImageWrapper>
              ))
          )}
        </GridTwo>
      </ScrollableWrapper>

    </Wrapper>
  );
})

export default DifferentLayoutHolder;
