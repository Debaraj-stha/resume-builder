import { memo } from "react";
import {
  BorderBox,
  ColumnFlexBox,
  FlexBox
} from "../../CustomComponents";
import capitalize from "../../../helper/capitalize";

const SkillCard = memo(({ skills, style, ...props }) => {
  const {
    shouldIncludeField,
    borderBox,
    borderBottom
  } = props;
  const commonStyle = {
    ...style.sectionSubHeader,
    margin: "0",
    padding: "0"
  };
   const borderColor=style.borderColor
  const RenderItem = ({ item }) => <h3 style={commonStyle}>{capitalize(item)}</h3>
  const renderSkillItem = (item, key) => {
   
    if (borderBottom) {
      return (
        <BorderBox key={key} borderBottomColor={style.borderColor ? style.borderColor : "#555"}>
          <RenderItem item={item} />
        </BorderBox>
      );
    }

    if (borderBox) {
      return (
        <BorderBox
          key={key}
          borderBottomColor={borderColor?borderColor:"#555"}
          borderLeftColor={borderColor?borderColor:"#555"}
          borderTopColor={borderColor?borderColor:"#555"}
          borderRightColor={borderColor?borderColor:"#555"}
          padding="5px"
          borderRadius="3px"
        >
          <RenderItem item={item}/>
        </BorderBox>
      );
    }

    return  <RenderItem key={key} item={item}/>
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
                ...style?.h3,
                margin: "0",
                padding: "0"
              }}
            >
              {capitalize(skill.field)}:
            </h3>
          )}
          {skill?.items?.map((item, i) =>
            renderSkillItem(item.value, `${index}-${i}`)
          )}
        </FlexBox>
      ))}
    </ColumnFlexBox>
  );
});

export default SkillCard;
