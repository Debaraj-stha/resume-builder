import { memo } from "react";
import { BorderBox, FlexBox, GridBox } from "../../CustomComponents";
import { H2, H3, P, SkillCardWrapper } from "../../elements/resumeSectionWrapper";
//styles
import style from "../classic/style/layout1_style.json"
import style2 from "../classic/style/layout2_style.json"
import style3 from "../classic/style/layout3_style.json"
import { layout_type_map } from "../../../constant";
const ClassicalSkillcardCase3 = ({ skills }) => {
    return (
        <div>
            {skills.map((skill, index) => (
                <SkillCardWrapper key={index}>
                    <P>{skill.field}:</P>
                    <SkillCardItemsWrapper className="">
                        {skill.items.map((item, i) => (
                            <P key={i}>{item}</P>
                        ))}
                    </SkillCardItemsWrapper>
                </SkillCardWrapper>
            ))}
        </div>
    );
};
const BuildFlexSkillCard = ({ skills }) => {
    const flatSkills = skills.map(skill => skill.items).flat().slice(0, 8)
    //flat skills items and only get 8 skills
    return (
        <GridBox>
            {
                flatSkills.map((item, index) => {
                    return (
                        <BorderBox key={`${index}`}>
                            <P fontWeight="600" className={style2.SkillCard.p.className.join | (" ")}>{item}</P>
                        </BorderBox>
                    )
                })
            }
        </GridBox>
    )
}

const buildClassicalSkillCard = ({ skills, layout_no }) => {
    switch (layout_no) {
        case 2:
            return (
                <div className={style2.SkillCard.div.className.join(" ")}>
                    {skills.map((skill, index) =>
                        skill.items.map((item, i) => (
                            <P key={`${index}-${i}`} className={style2.SkillCard.p.className.join | (" ")}>{item}</P>
                        ))
                    )}
                </div>

            )
        case 3:
            return <ClassicalSkillcardCase3 skills={skills} />
        case 4:
            return <BuildFlexSkillCard skills={skills} />

        case 5:
            return (
                <div>
                    <P fontFamily="Open Sans" fontSize="14px" fontWeight="500">

                        {
                            skills.map((skill, index) => (
                                <span key={index}>{skill.items.join(",")}</span>
                            ))
                        }
                    </P>
                </div>
            )
        case 6:

            return <BuildFlexSkillCard skills={skills} />


        default:


            return (
                <div>
                    <P>

                        {
                            skills.map((skill, index) => (
                                <span key={index}>{skill.items.join(",")}</span>
                            ))
                        }
                    </P>
                </div>
            )

    }

}
const buildModernSkillsCard = ({ skills, layout_no,style }) => {
    switch (layout_no) {
        case 1:
            return (
                skills.map((skill, index) => (
                    <div key={index}>
                        <H2 textAlign="left" fontWeight="600" fontSize="15px" >{skill.field}</H2>
                        <FlexBox margin="0">
                            {
                                skill.items.map((item, i) => (
                                    <P key={`${index}-${i}`} color="#514848">{item}</P>
                                ))
                            }
                        </FlexBox>
                    </div>
                ))
            )
            case 2:
                return(
                   skills.slice(0,3).map((skill,index)=>(
                    <div key={index}>
                         <H2 color="#4bdd97" fontFamily="'Raleway', sans-serif" fontWeight="600" textAlign="left">{skill.field}</H2>
                         <FlexBox margin="0">
                            {
                                skill.items.map((item,i)=>(
                                   <BorderBox color="#ccc" key={`${index}-${i}`}>
                                     <H2 color="#044627" fontFamily="'Raleway', sans-serif" fontWeight="normal" textAlign="left" fontSize="16px">{item}</H2>
                                   </BorderBox>
                                ))
                            }
                         </FlexBox>
                    </div>
                   ))
                )
            case 3:
                return(
                    <FlexBox margin="0" flexWrap="wrap">
                        {
                            skills.map((skill,index)=>(
                                skill.items.map((item,i)=>(
                                    <BorderBox key={`${index}-${i}`} color="#ccc" width="2px" >
                                        <H3 fontWeight="500">{item}</H3>
                                    </BorderBox>
                                ))
                            ))
                        }

                    </FlexBox>
                )

            case 4:
                return(
                    <FlexBox flexWrap="wrap">
                        {
                            skills.slice(0,3).map((skill,index)=>(
                                skill.items.map((item,i)=>(
                                    <BorderBox key={`${index}-${i}`} color="#b1a0a0" padding="6px" width="2px">
                                        <H3 style={{...style.h3}}>{item}</H3>
                                    </BorderBox>
                                ))
                            ))
                        }
                    </FlexBox>
                )
                case 5:
                    return(
                        <>
                        <FlexBox flexWrap="wrap">
                        {
                            skills.slice(0,3).map((skill,index)=>(
                                skill.items.map((item,i)=>(
                                    <BorderBox key={`${index}-${i}`} color="#cec9c9" padding="6px" width="2px">
                                        <H3 style={{...style.header,margin:"0", padding:"0"}}>{item}</H3>
                                    </BorderBox>
                                ))
                            ))
                        }
                    </FlexBox>
                        </>
                    )
        default:
            return <h1>default skill</h1>
    }
}

const SkillCard = memo(({ skills, layout_no, layout_type,style }) => {
    if (layout_type === layout_type_map.CLASSICAL) {
        return buildClassicalSkillCard({ skills, layout_no })
    }
    if (layout_type === layout_type_map.MODERN) {
        return buildModernSkillsCard({ skills, layout_no,style })
    }

})
export default SkillCard