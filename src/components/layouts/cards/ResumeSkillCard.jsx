import { memo } from "react";
import {
  BorderBox,
  ColumnFlexBox,
  FlexBox
} from "../../CustomComponents";

const SkillCard = memo(({ skills, style, ...props }) => {
  const {
    shouldIncludeField,
    borderBox,
    borderBottom
  } = props;

  const renderSkillItem = (item, key) => {
    const commonStyle = {
      ...style.sectionSubHeader,
      margin: "0",
      padding: "0"
    };

    if (borderBottom) {
      return (
        <BorderBox key={key} borderBottomColor="#555">
          <h3 style={commonStyle}>{item}</h3>
        </BorderBox>
      );
    }

    if (borderBox) {
      return (
        <BorderBox
          key={key}
          borderBottomColor="#555"
          borderLeftColor="#555"
          borderTopColor="#555"
          borderRightColor="#555"
          padding="5px"
        >
          <h3 style={commonStyle}>{item}</h3>
        </BorderBox>
      );
    }

    return (
      <h3 key={key} style={commonStyle}>
        {item}
      </h3>
    );
  };

  return (
    <ColumnFlexBox
      {...(!shouldIncludeField && {
        flexDirection: "row",
        gap: "0",
        flexWrap: "wrap"
      })}
    >
      {skills.map((skill, index) => (
        <FlexBox
          key={index}
          flexWrap="wrap"
          margin="0"
          alignItems="center"
          gap="8px"
        >
          {shouldIncludeField && (
            <h3
              style={{
                ...style.sectionSubHeader,
                margin: "0",
                padding: "0"
              }}
            >
              {skill.field}:
            </h3>
          )}
          {skill.items.map((item, i) =>
            renderSkillItem(item, `${index}-${i}`)
          )}
        </FlexBox>
      ))}
    </ColumnFlexBox>
  );
});

export default SkillCard;
