import { createContext, useCallback, useContext, useMemo } from "react";

import jsPDF from "jspdf";
import { nameStyle, headerStyle, subHeaderStyle, normalStyle, subsubHeaderStyle } from "../helper/pdf/style";
import renderPersonalDetailsSection from "../helper/pdf/render/renderPersonalDetails";
import renderExperienceSection from "../helper/pdf/render/renderExperiences";
import { renderSummarySection } from "../helper/pdf/render/renderSummary";
import { pdfSize } from "../helper/pdf/core";
import { renderAchievementsSection } from "../helper/pdf/render/renderAchievements";
import renderEducationSection from "../helper/pdf/render/renderEducation";
const DirectPDFContext = createContext()

const DirectPDFWriterProvider = ({ children }) => {
    const defaultSectionProps = {
        personalDetailsProps: {},
        experiencesProps: {},
        educationProps: {},
        achievementsProps: {},
        trainingsProps: {},
        awardsProps: {},
        skillsProps: {},
        certificatesProps: {},
        myTimeProps: {},
        industryExpertiseProps: {},
        openSourceWorkProps: {},
        strengthsProps: {},
        languagesProps: {},
        summaryProps: {}
    };
    const defaultStyles = {
        nameStyle,
        headerStyle,
        subHeaderStyle,
        subsubHeaderStyle,
        normalStyle
    };
    const pagePadding = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    }
    const xPadding = pagePadding.left + pagePadding.right
    const yPadding = pagePadding.top + pagePadding.bottom
    const { top, left, right, bottom } = pagePadding
    let currentPos = { x: 0, y: 0 }
    /**
     * function which create and download pdf using jsPDF package
     * @param {{
     * personalDetails,
     * educations,
     * achievements,
     * summary,
     * }} sections
     */
    const createPDF = useCallback(async (sections = {}, styles = {}, props = {}) => {
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
            summary
        } = sections
        const {
            nameStyle: appliedNameStyle = defaultStyles.nameStyle,
            headerStyle: appliedHeaderStyle = defaultStyles.headerStyle,
            subHeaderStyle: appliedSubHeaderStyle = defaultStyles.subHeaderStyle,
            subsubHeaderStyle: appliedSubsubHeaderStyle = defaultStyles.subsubHeaderStyle,
            normalStyle: appliedNormalStyle = defaultStyles.normalStyle
        } = styles;


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
            summaryProps = defaultSectionProps.summaryProps
        } = props;


        console.log("creating pdf...")
        const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" })
        const { pdfWidth: width, pdfHeight: height } = pdfSize(pdf)
        // if (personalDetails)
        //     currentPos = await renderPersonalDetailsSection(
        //         pdf,
        //         personalDetails,
        //         { top, left },
        //         {
        //             nameStyle: appliedNameStyle,
        //             subHeaderStyle: appliedSubHeaderStyle,
        //             subSubHeaderStyle: appliedSubsubHeaderStyle
        //         },
        //         { xPadding, yPadding },
        //         personalDetailsProps
        //     )
        // if (summary) {
        //     currentPos = await renderSummarySection(pdf, summary,
        //         { x: left, y: currentPos.y }, width - xPadding,
        //         {
        //             normalStyle: appliedNormalStyle,
        //             headerStyle: appliedHeaderStyle
        //         })
        // }
        // if (experiences)
        //     currentPos = await renderExperienceSection(pdf,
        //         experiences,
        //         { left, y: currentPos.y, xPadding },
        //         {
        //             normalStyle: appliedNormalStyle,
        //             headerStyle:appliedHeaderStyle,
        //             subSubHeaderStyle:appliedSubsubHeaderStyle,
        //             subHeaderStyle: {...appliedSubHeaderStyle,align:"left"}

        //         },
        //         experiencesProps
        //     )
        // if (educations) {
        //     currentPos = await renderEducationSection(
        //         pdf,
        //         educations,
        //         { x: left, y: currentPos.y },
        //         {
        //             headerStyle: appliedHeaderStyle,
        //             normalStyle: appliedNormalStyle,
        //             subHeaderStyle: {...appliedSubHeaderStyle,align:"left"},
        //             subSubHeaderStyle: {...appliedSubsubHeaderStyle,align:"left"}
        //         },
        //         pagePadding,
        //         educationProps
        //     )
        // }
        if (achievements)
            currentPos = await renderAchievementsSection(pdf,
                achievements,
                { x: left, y: currentPos.y },
                {
                    headerStyle: appliedHeaderStyle,
                    normalStyle: appliedNormalStyle,
                    subHeaderStyle: appliedSubHeaderStyle,
                    subSubHeaderStyle: appliedSubsubHeaderStyle
                },
                pagePadding,
                achievementsProps
            )

        const now = Date.now()
        const filename = `resume-${now}.pdf`
        pdf.save(filename)
        console.log("pdf saved with filename", filename)

    }, [])


    const contextValue = useMemo(() => ({
        createPDF
    }), [createPDF])
    return (
        <DirectPDFContext.Provider value={contextValue}>
            {children}
        </DirectPDFContext.Provider>
    )
}
export default DirectPDFWriterProvider
export const useDirectPDFWriter = () => useContext(DirectPDFContext)