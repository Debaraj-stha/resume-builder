import styled from "styled-components";
import { useEffect, useState } from "react";
import { LeftColumn, RightColumn, Section } from "../../elements/resumeSectionWrapper";
import { ResumeWrapper, CreativeResumeWrapperWithLine } from "../../elements/resumeWrapper";
import CurvedWrapper from "../wrappers/curved-wrapper";
import { defineContentColumn } from "./render-ui-helper";


export const Wrapper = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  min-width: 100%;
  max-height: 100%;
`;

const renderLayout = ({
  pages,
  sectionData,
  sectionRefs,
  key_val,
  leftFlex = "2",
  rightFlex = "3",
  background = "transparent",
  props = {
    leftPadding: "0",
    rightPadding: "0",
    mainPadding: "20mm",
    personalDetailsOnLeft: false,
  },
}) => {
  const {
    leftPadding,
    rightPadding,
    mainPadding,
    layout,
    personalDetailsOnLeft,
    includeNameInitial,
  } = props;

  const layout_map = {
    CURVED: "curved",
    NORMAL: "normal",
    LINE: "line",
  };

  const [sectionsHeight, setSectionsHeight] = useState([]);

  const CustomWrapper = layout === layout_map.CURVED
    ? CurvedWrapper
    : layout === layout_map.LINE
    ? CreativeResumeWrapperWithLine
    : ResumeWrapper;

  useEffect(() => {
    if (
      !sectionRefs.current ||
      sectionRefs.current.length === 0 ||
      sectionRefs.current.some((ref) => ref === null)
    ) {
      return;
    }
    const heights = sectionRefs.current.map((ref) => ref.offsetHeight || 0);
    setSectionsHeight(heights);
  }, [sectionData.length, sectionRefs]);

  const renderUI = (headerSection, leftColumn, rightColumn,key) => (
    <CustomWrapper padding={mainPadding}>
      {headerSection}
      <Wrapper>
        <LeftColumn flex={leftFlex} padding={leftPadding}>
          {leftColumn}
        </LeftColumn>
        <RightColumn flex={rightFlex} padding={rightPadding} backgroundColor={background}>
          {rightColumn}
        </RightColumn>
      </Wrapper>
    </CustomWrapper>
  );

  const processSections = (sectionIndexes) => {
    const columnState = {
      leftColumn: [],
      rightColumn: [],
      headerSection: null,
      leftHeight: 0,
      rightHeight: 0,
    };

    const groupAssignmentMap = {};

    sectionIndexes.forEach((index) => {
      const section = sectionData[index];
      if (!section) return;

      defineContentColumn({
        section,
        index,
        key_val,
        sectionRefs,
        sectionsHeight,
        personalDetailsOnLeft,
        includeNameInitial,
        groupAssignmentMap,
        columnState,
      });
    });

    return renderUI(
      columnState.headerSection,
      columnState.leftColumn,
      columnState.rightColumn,
      
    );
  };

  if (pages.length > 0) {
    return pages.map((group) => processSections(group));
  }

  return processSections(sectionData.map((_, i) => i));
};

export default renderLayout;
