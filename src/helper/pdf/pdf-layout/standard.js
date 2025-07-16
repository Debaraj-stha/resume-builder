import jsPDF from "jspdf";
import  renderPersonalDetailsSection from "../render/renderPersonalDetails"
import renderExperienceSection from "../render/renderExperiences";
import renderEducationSection from "../render/renderEducation";
import renderAchievementsSection from "../render/renderAchievements";
import renderTrainingsSection from "../render/renderTraining"; 
import renderAwardsSection from "../render/renderAwards";
import renderSkillsSection from "../render/renderSkills";
import renderCertificateSection from "../render/renderCertificates";
import renderOpenSourceWorkSection from "../render/renderOpenSource";
import renderIndustryExpertiseSection from "../render/renderIndustryExpertise";
import renderStrengthsSection from "../render/renderStrengths";
import renderLanguagesSection from "../render/renderLanguages";
import renderSummarySection from "../render/renderSummary";
import renderPassionsSection from "../render/renderPassionsSection";
import { measureAndRenderSection, pdfSize } from "../core";

/**
 * a function to render a standard PDF layout
 * @param {jsPDF} pdf - the jsPDF instance
 * @param {Object} sections - the sections to be rendered in the PDF
 * @param {Object} styles - the styles to be applied to the sections
 * @param {Object} props - additional properties for rendering
 */
const standardPDFLayout = async (pdf, sections = {}, styles = {}, props = {}) => {
    try {
        
    
    const {
        personalDetails,
        experiences,
        educations,
        achievements,
        trainings,
        awards,
        skills,
        certificates,
        my_time,
        industryExpertise,
        openSourceWork,
        strengths,
        languages,
        summary,
        passions
    } = sections
    
    const {
        nameStyle: appliedNameStyle = defaultStyles.nameStyle,
        headerStyle: appliedHeaderStyle = defaultStyles.headerStyle,
        subHeaderStyle: appliedSubHeaderStyle = defaultStyles.subHeaderStyle,
        subSubHeaderStyle: appliedSubsubHeaderStyle = defaultStyles.subSubHeaderStyle,
        normalStyle: appliedNormalStyle = defaultStyles.normalStyle
    } = styles;

    const { defaultSectionProps, pagePadding, defaultStyles } = props
    let{currentPos}= props
    const{left,top,right,bottom}=pagePadding
    const xPadding = left + right
    const yPadding = top + bottom
    const {
        personalDetailsProps = defaultSectionProps.personalDetailsProps,
        experiencesProps = defaultSectionProps.experiencesProps,
        educationProps = defaultSectionProps.educationProps,
        achievementsProps = defaultSectionProps.achievementsProps,
        trainingsProps = defaultSectionProps.trainingsProps,
        awardsProps = defaultSectionProps.awardsProps,
        skillsProps = defaultSectionProps.skillsProps,
        certificatesProps = defaultSectionProps.certificatesProps,
        myTimeProps = defaultSectionProps.myTimeProps,
        industryExpertiseProps = defaultSectionProps.industryExpertiseProps,
        openSourceWorkProps = defaultSectionProps.openSourceWorkProps,
        strengthsProps = defaultSectionProps.strengthsProps,
        languagesProps = defaultSectionProps.languagesProps,
        summaryProps = defaultSectionProps.summaryProps,
        passionProps = defaultSectionProps.passionProps,
        commonProps = {},
        headers = {
            achievements: "Achievements",
            experiences: "Experiences",
            educations: "Education",
            trainings: "Trainings",
            awards: "Awards",
            skills: "Skills",
            certificates: "Certificates",
            openSourceWork: "Open Source Work",
            industryExpertise: "Industry Expertise",
            strengths: "Strengths",
            languages: "Languages",
            passions: "Passions",
            summary: "Summary"
        },

    } = props;
    const dummyPDF = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" })
    const{pdfWidth}=pdfSize(pdf)
    const centeredWidth=pdfWidth/2
    const {alignHeadingLeft  = false,align="center" } = commonProps
    const isAlignedLeft = align === "left"
    const isHeadingLeft = alignHeadingLeft || isAlignedLeft
    const widthToUse = isAlignedLeft ? left : centeredWidth
    const widthToUseForHeading = isHeadingLeft ? left : centeredWidth
    if (personalDetails)
        currentPos = await renderPersonalDetailsSection(
            pdf,
            personalDetails,
            { top, left, centeredWidth: widthToUse },
            {
                nameStyle: appliedNameStyle,
                subHeaderStyle: appliedSubHeaderStyle,
                subSubHeaderStyle: appliedSubsubHeaderStyle,
                contactStyle: appliedHeaderStyle.contactStyle
            },
            { xPadding, yPadding },
            personalDetailsProps
        )

    if (summary) {
        currentPos = renderSummarySection(pdf, summary,
            { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading, xPadding }, width - xPadding,
            {
                normalStyle: appliedNormalStyle,
                headerStyle: appliedHeaderStyle
            }, {}, summaryProps, headers.summary,
        )
    }
    if (experiences)
        currentPos = await measureAndRenderSection({
            renderFn: renderExperienceSection,
            pdf,
            dummyPdf: dummyPDF,
            data: experiences,
            header: headers.experiences,
            coords: { x:left, y: currentPos.y, xPadding, centeredWidth: widthToUseForHeading },
            style: {
                normalStyle: appliedNormalStyle,
                headerStyle: appliedHeaderStyle,
                subSubHeaderStyle: appliedSubsubHeaderStyle,
                subHeaderStyle: { ...appliedSubHeaderStyle, align: "left" }
            },
            padding: pagePadding,
            props: experiencesProps
        })
    if (educations) {
        currentPos = await measureAndRenderSection({
            renderFn: renderEducationSection,
            pdf,
            header: headers.educations,
            dummyPdf: dummyPDF,
            data: educations,
            coords: { x: left, y: currentPos.y, xPadding, centeredWidth: widthToUseForHeading },
            style: {
                headerStyle: appliedHeaderStyle,
                normalStyle: appliedNormalStyle,
                subHeaderStyle: { ...appliedSubHeaderStyle, align: "left" },
                subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" }
            },
            padding: pagePadding,
            props: educationProps
        })

    }
    if (achievements)
        currentPos = await measureAndRenderSection({
            renderFn: renderAchievementsSection,
            pdf,
            header: headers.achievements,
            dummyPdf: dummyPDF,
            data: achievements,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            style: {
                headerStyle: appliedHeaderStyle,
                normalStyle: appliedNormalStyle,
                subHeaderStyle: appliedSubHeaderStyle,
                subSubHeaderStyle: appliedSubsubHeaderStyle
            },
            padding: pagePadding,
            props: achievementsProps
        })
    if (skills)
        currentPos = await measureAndRenderSection({
            renderFn: renderSkillsSection,
            pdf,
            dummyPdf: dummyPDF,
            data: skills,
            header: headers.skills,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            style: {
                headerStyle: appliedHeaderStyle,
                normalStyle: appliedNormalStyle,
                subHeaderStyle: appliedSubHeaderStyle,
                subSubHeaderStyle: appliedSubsubHeaderStyle
            },
            padding: pagePadding,
            props: skillsProps
        })
    if (strengths)
        currentPos = await measureAndRenderSection({
            renderFn: renderStrengthsSection,
            data: strengths,
            pdf,
            header: headers.strengths,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            padding: pagePadding,
            props: strengthsProps,
            style: {
                headerStyle: appliedHeaderStyle,
                normalStyle: appliedNormalStyle,
                subHeaderStyle: { ...appliedSubHeaderStyle, align: "left" },

            },

        })

    if (passions) {
        currentPos = await measureAndRenderSection({
            renderFn: renderPassionsSection,
            data: passions,
            pdf,
            header: headers.passions,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            padding: pagePadding,
            props: passionProps,
            style: {
                headerStyle: appliedHeaderStyle,
                subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
            }
        })


    }
    if (trainings)
        currentPos = await measureAndRenderSection({
            renderFn: renderTrainingsSection,
            data: trainings,
            pdf,
            header: headers.trainings,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            padding: pagePadding,
            props: trainingsProps,
            style: {
                headerStyle: appliedHeaderStyle,
                subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
                normalStyle: appliedNormalStyle
            },


        })

    if (awards)
        currentPos = await measureAndRenderSection({
            renderFn: renderAwardsSection,
            data: awards,
            pdf,
            header: headers.awards,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            padding: pagePadding,
            props: awardsProps,
            style: {
                headerStyle: appliedHeaderStyle,
                subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
                normalStyle: appliedNormalStyle
            },


        })

    if (certificates) {
        currentPos = await measureAndRenderSection({
            renderFn: renderCertificateSection,
            data: certificates,
            pdf,
            header: headers.certificates,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            padding: pagePadding,
            props: certificatesProps,
            style: {
                headerStyle: appliedHeaderStyle,
                subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
                normalStyle: appliedNormalStyle
            },



        })

    }
    if (openSourceWork)
        currentPos = await measureAndRenderSection({
            renderFn: renderOpenSourceWorkSection,
            data: openSourceWork,
            pdf,
            header: headers.openSourceWork,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            padding: pagePadding,
            props: openSourceWorkProps,
            style: {
                headerStyle: appliedHeaderStyle,
                subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
                normalStyle: appliedNormalStyle,
            },


        })

    // if (languages)
    //     currentPos = await measureAndRenderSection({
    //         renderFn: renderLanguagesSection,
    //         data: languages,
    //         pdf,
    //         header: "Languages",
    //         coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading},
    //         padding: pagePadding,
    //         props: languagesProps,
    //         style: {
    //             headerStyle: appliedHeaderStyle,
    //             subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
    //             normalStyle: appliedNormalStyle,
    //         },


    //     })
    if (industryExpertise)
        currentPos = await measureAndRenderSection({
            renderFn: renderIndustryExpertiseSection,
            data: industryExpertise,
            pdf,
            header: headers.industryExpertise,
            coords: { x: left, y: currentPos.y, centeredWidth: widthToUseForHeading },
            padding: pagePadding,
            props: industryExpertiseProps,
            style: {
                headerStyle: appliedHeaderStyle,
                subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
                normalStyle: appliedNormalStyle,
            },


        })
        } catch (error) {
        console.error("Error in standardPDFLayout:", error);
        return;
    }
}
export default standardPDFLayout;