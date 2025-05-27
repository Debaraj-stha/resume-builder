import { createContext, useCallback, useContext, useMemo } from "react";

import jsPDF from "jspdf";
import { nameStyle, headerStyle, subHeaderStyle, normalStyle, subsubHeaderStyle } from "../helper/pdf/style";
import renderPersonalDetailsSection from "../helper/pdf/render/renderPersonalDetails";
import renderExperienceSection from "../helper/pdf/render/renderExperiences";
const DirectPDFContext = createContext()

const DirectPDFWriterProvider = ({ children }) => {
    const defaultSectionProps = {
        personalDetailsProps: {},
        experiencesProps: {},
        educationsProps: {},
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
    let currentPos
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
            educationsProps = defaultSectionProps.educationsProps,
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
        if (personalDetails)
            currentPos = await renderPersonalDetailsSection(
                pdf,
                personalDetails,
                { top, left },
                { nameStyle: appliedNameStyle, subHeaderStyle: appliedSubHeaderStyle, subsubHeaderStyle: appliedSubsubHeaderStyle },
                { xPadding, yPadding },
                personalDetailsProps
            )
        if (experiences)
            currentPos =await renderExperienceSection(pdf,
                experiences,
                { left, xPadding, y: currentPos.y },
                {
                    normalStyle: appliedNormalStyle,
                    headerStyle: appliedHeaderStyle, subHeaderStyle: { ...appliedSubHeaderStyle, align: "left" },subsubHeaderStyle
                },
                experiencesProps
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