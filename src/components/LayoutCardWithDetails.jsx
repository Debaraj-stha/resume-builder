import styled from "styled-components";
import LayoutCard from "./LayoutCard"
import LayoutDescriptionCard from "./LayoutDescriptionCard"
import { Button, FlexBox, H3 } from "./CustomComponents";
import { memo } from "react";
import useNavigateToLayout from "../helper/hooks/useNavigateToLayout";


const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4); /* semi-transparent dark overlay */
  opacity: 0; /*hidden by default*/
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
`;

const ImageContainer = styled.div`
  height: 600px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05); /* Slight zoom effect */
  }

  &:hover ${Overlay} {
    opacity: 1; /*show on hover */
  }
`;
const LayoutCardWithDetails = memo(({ imageSRC, layoutName, layoutDescription, userCount, layout_type,layout_id ,includeUserCount = false,}) => {
 const navigate=useNavigateToLayout()
  return (
    <LayoutCard>
      <ImageContainer>
        <img src={imageSRC} alt="layout" loading="lazy" />
        <Overlay>
          <Button onClick={()=>navigate(layout_type,layout_id)}>Customize This Template</Button>
        </Overlay>
      </ImageContainer>
      <LayoutDescriptionCard title={layoutName} description={layoutDescription} includeUserCount={includeUserCount} userCount={userCount} />

    </LayoutCard>
  )
})

export default LayoutCardWithDetails