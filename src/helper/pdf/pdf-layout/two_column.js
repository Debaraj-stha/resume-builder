import jsPDF from "jspdf";
import { drawTwoColumnsLayout } from "../layout";
import { measureAndRenderSection, pdfSize } from "../core";
import renderPersonalDetailsSection from "../render/renderPersonalDetails";
import renderExperienceSection from "../render/renderExperiences";
import renderStrengthsSection from "../render/renderStrengths";
import renderSkillsSection from "../render/renderSkills";

/**
 * 
 * @param {jsPDF} pdf  - the jsPDF instance
 * @param {Object} sections - the sections to be rendered in the PDF
 * @param {Object} styles - the styles to be applied to the sections
 * @param {Object} props - additional properties for rendering
 */
const twoColumnPDFLayout = async (pdf, sections = {}, styles = {}, props = {}) => {
    console.log("Creating two column PDF layout with sections:", sections);
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
        let { currentPos } = props
        const { left, top, right, bottom, rightColumnPadding, leftColumnPadding } = pagePadding
        const xPadding = left + right
        const yPadding = top + bottom
        const dummyPDF = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" })
        const {
            top: rightColumnTop = 10,
            right: rightColumnRight = 10,
            bottom: rightColumnBottom = 10,
            left: rightColumnLeft = 10,
        } = rightColumnPadding || {};
        const {
            top: leftColumnTop = 10,
            right: leftColumnRight = 10,
            bottom: leftColumnBottom = 10,
            left: leftColumnLeft = 10,
        } = leftColumnPadding || {};

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
        const { alignHeadingLeft = false, align = "center", leftColumnSizeFraction = 0.5, rightColumnSizeFraction = 0.5 } = commonProps
        const { height: pdfHeight, width: pdfWidth } = pdf.internal.pageSize
        const isAlignedLeft = align === "left"
        const isHeadingLeft = alignHeadingLeft || isAlignedLeft
        // const centeredWidth = (pdfWidth - xPadding)/2;
        const leftSize = pdfWidth * leftColumnSizeFraction;
        const rightSize = pdfWidth * rightColumnSizeFraction;
        console.log("strengths", strengths)
        await drawTwoColumnsLayout(pdf, {
            leftContent: async () => {
                const widthToUse = isAlignedLeft ? left : leftSize / 2
                const widthToUseForHeading = isHeadingLeft ? left : leftSize / 2
                let leftFinalY = left + yPadding;
                const leftX = left;
                const leftY = top;
                console.log(widthToUse, leftY, leftX)
                if (personalDetails) {
                    const personalDetailsPos = renderPersonalDetailsSection(
                        pdf,
                        personalDetails,
                        { top: leftY, left: leftX, centeredWidth: widthToUse },
                        {
                            nameStyle: appliedNameStyle,
                            subHeaderStyle: appliedSubHeaderStyle,
                            subSubHeaderStyle: appliedSubsubHeaderStyle,
                            contactStyle: appliedHeaderStyle.contactStyle
                        },
                        { xPadding, yPadding },
                        personalDetailsProps
                    );
                    leftFinalY += personalDetailsPos;
                }
            },
            rightContent: async () => {
                let rightFinalX = rightSize + xPadding;
                let rightY = top;
                const rightX = leftSize + leftColumnRight
                const widthToUseForHeading = isHeadingLeft ? leftSize + leftColumnRight : rightFinalX
                console.log("isHeadingleft", isHeadingLeft, "widthToUseForHeading", widthToUseForHeading)
                if (experiences) {
                    console.log("Rendering experiences section with props:", experiences);
                    rightY = await measureAndRenderSection({
                        renderFn: renderExperienceSection,
                        pdf,
                        dummyPdf: dummyPDF,
                        data: experiences,
                        header: headers.experiences,
                        coords: { x: rightX, y: rightY, xPadding: xPadding / 2, centeredWidth: widthToUseForHeading },
                        style: {
                            normalStyle: appliedNormalStyle,
                            headerStyle: appliedHeaderStyle,
                            subSubHeaderStyle: appliedSubsubHeaderStyle,
                            subHeaderStyle: { ...appliedSubHeaderStyle, align: "left" }
                        },
                        padding: pagePadding,
                        props: { ...experiencesProps, pdfWidth: rightSize,columnLayout:true }
                    }).y
                }
                if (strengths)
                    rightY = await measureAndRenderSection({
                        renderFn: renderStrengthsSection,
                        data: strengths,
                        pdf,
                        dummyPdf: dummyPDF,
                        header: headers.strengths,
                        coords: { x: rightX, y: rightY, centeredWidth: widthToUseForHeading },
                        padding: pagePadding,
                        props: {...strengthsProps,columnLayout:true},
                        style: {
                            headerStyle: appliedHeaderStyle,
                            normalStyle: appliedNormalStyle,
                            subHeaderStyle: { ...appliedSubHeaderStyle, align: "left" },

                        },

                    }).y
                if (skills)
                    rightY = await measureAndRenderSection({
                        renderFn: renderSkillsSection,
                        pdf,
                        dummyPdf: dummyPDF,
                        data: skills,
                        header: headers.skills,
                        coords: { x: rightX, y: rightY, centeredWidth: widthToUseForHeading },
                        style: {
                            headerStyle: appliedHeaderStyle,
                            normalStyle: appliedNormalStyle,
                            subHeaderStyle: appliedSubHeaderStyle,
                            subSubHeaderStyle: appliedSubsubHeaderStyle
                        },
                        padding: pagePadding,
                        props: skillsProps
                    }).y
            }
        },
            { rightColor: [26, 53, 91] },
            { leftSize, rightSize }, {},

        )
    } catch (error) {
        console.error("Error in twoColumnPDFLayout:", error);
        return;
    }
}
export default twoColumnPDFLayout;