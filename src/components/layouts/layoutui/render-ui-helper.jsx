import { Section } from "../../elements/resumeSectionWrapper";
import NameInitial from "../../NameInitial";


export const renderSection = (sectionRefs, section, index, key_val) => {
  const SectionContent = section.content(key_val?.[section.key]);

  return (
    <Section
      key={section.id || section.key || index}
      ref={(el) => (sectionRefs.current[index] = el)}
      margin={index === 0 ? "0" : "0 10px"}
      marginTop={index === 0 ? 0 : "15px"}
    >
      {SectionContent}
    </Section>
  );
};

export const defineContentColumn = ({
  section,
  index,
  key_val,
  sectionRefs,
  sectionsHeight,
  personalDetailsOnLeft,
  includeNameInitial,
  groupAssignmentMap,
  columnState,
}) => {
  const {
    leftColumn,
    rightColumn,
    headerSection,
    leftHeight,
    rightHeight,
  } = columnState;

  const content = renderSection(sectionRefs, section, index, key_val);
  const sectionHeight = sectionsHeight[index] || 0;
  const isGroupedSection = !!section.groupId;

  if (index === 0) {
    if (personalDetailsOnLeft) {
      leftColumn.push(content);
      columnState.leftHeight += sectionHeight;
      rightColumn.push(
        includeNameInitial
          ? <NameInitial key={`name_initial_${index}`} name={key_val?.personalDetails?.name} />
          : <Section key="placeholder" marginTop="100px" />
      );
    } else {
      columnState.headerSection = content;
    }
  } else if (isGroupedSection) {
    const groupId = section.groupId;
    if (!groupAssignmentMap[groupId]) {
      groupAssignmentMap[groupId] =
        columnState.leftHeight <= columnState.rightHeight ? "left" : "right";
    }

    const side = groupAssignmentMap[groupId];
    if (side === "left") {
      leftColumn.push(content);
      columnState.leftHeight += sectionHeight;
    } else {
      rightColumn.push(content);
      columnState.rightHeight += sectionHeight;
    }
  } else {
    if (columnState.leftHeight <= columnState.rightHeight) {
      leftColumn.push(content);
      columnState.leftHeight += sectionHeight;
    } else {
      rightColumn.push(content);
      columnState.rightHeight += sectionHeight;
    }
  }
};
