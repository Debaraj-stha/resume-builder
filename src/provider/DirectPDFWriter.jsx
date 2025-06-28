import { createContext, useCallback, useContext, useMemo } from "react";

import jsPDF from "jspdf";
import { nameStyle, headerStyle, subHeaderStyle, normalStyle, subSubHeaderStyle } from "../helper/pdf/style";
import renderPersonalDetailsSection from "../helper/pdf/render/renderPersonalDetails";
import renderExperienceSection from "../helper/pdf/render/renderExperiences";
import { renderSummarySection } from "../helper/pdf/render/renderSummary";
import { measureAndRenderSection, pdfSize } from "../helper/pdf/core";
import { renderAchievementsSection } from "../helper/pdf/render/renderAchievements";
import renderEducationSection from "../helper/pdf/render/renderEducation";
import { renderSkillsSection } from "../helper/pdf/render/renderSkills";
import { renderStrengthsSection } from "../helper/pdf/render/renderStrengths";
import { renderPassionsSection } from "../helper/pdf/render/renderPassionsSection";
import { renderTrainingsSection } from "../helper/pdf/render/renderTraining";
import { renderAwardsSection } from "../helper/pdf/render/renderAwards";
import { renderCertificateSection } from "../helper/pdf/render/renderCertificates";
import { renderOpenSourceWorkSection } from "../helper/pdf/render/renderOpenSource";
import { renderLanguagesSection } from "../helper/pdf/render/renderLanguages";
import { renderIndustryExpertiseSection } from "../helper/pdf/render/renderIndustryExpertise";
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
        summaryProps: {},
        passionProps: {}
    };
    const defaultStyles = {
        nameStyle,
        headerStyle,
        subHeaderStyle,
        subSubHeaderStyle,
        normalStyle
    };
    const pagePadding = {
        top: 40,
        left: 40,
        right: 40,
        bottom: 40
    }
    const { top, left, right, bottom } = pagePadding
    const xPadding = left + right
    const yPadding = top + bottom
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
            summary,
            passions
        } = sections
        console.log("personal details",personalDetails)
        const {
            nameStyle: appliedNameStyle = defaultStyles.nameStyle,
            headerStyle: appliedHeaderStyle = defaultStyles.headerStyle,
            subHeaderStyle: appliedSubHeaderStyle = defaultStyles.subHeaderStyle,
            subSubHeaderStyle: appliedSubsubHeaderStyle = defaultStyles.subSubHeaderStyle,
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
            summaryProps = defaultSectionProps.summaryProps,
            passionProps = defaultSectionProps.passionProps
        } = props;


        console.log("creating pdf...")
        const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" })
        const dummyPDF = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" })
        const { pdfWidth: width, pdfHeight: height } = pdfSize(pdf)
        const centeredWidth = width / 2
        if (personalDetails)
            currentPos = await renderPersonalDetailsSection(
                pdf,
                personalDetails,
                { top, left, centeredWidth: centeredWidth },
                {
                    nameStyle: appliedNameStyle,
                    subHeaderStyle: appliedSubHeaderStyle,
                    subSubHeaderStyle: appliedSubsubHeaderStyle
                },
                { xPadding, yPadding },
                personalDetailsProps
            )
        if (summary) {
            currentPos = await renderSummarySection(pdf, summary,
                { x: left, y: currentPos.y, centeredWidth }, width - xPadding,
                {
                    normalStyle: appliedNormalStyle,
                    headerStyle: appliedHeaderStyle
                })
        }
        if (experiences)
            currentPos = await measureAndRenderSection({
                renderFn: renderExperienceSection,
                pdf,
                dummyPdf: dummyPDF,
                data: experiences,
                coords: { left, y: currentPos.y, xPadding, centeredWidth },
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
                dummyPdf: dummyPDF,
                data: educations,
                coords: { x:left, y: currentPos.y, xPadding, centeredWidth },
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
                dummyPdf: dummyPDF,
                data: achievements,
                coords: { x: left, y: currentPos.y, centeredWidth },
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
                coords: { x: left, y: currentPos.y, centeredWidth :centeredWidth},
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
                coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
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
                coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
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
                coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
                padding: pagePadding,
                props: trainingsProps,
                style: {
                    headerStyle: appliedHeaderStyle,
                    subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
                    normalStyle: appliedNormalStyle
                },
                header: "Training"

            })

        if (awards)
            currentPos = await measureAndRenderSection({
                renderFn: renderAwardsSection,
                data: awards,
                pdf,
                coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
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
                coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
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
                coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
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
        //         coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
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
                coords: { x: left, y: currentPos.y, centeredWidth: width / 2 },
                padding: pagePadding,
                props: industryExpertiseProps,
                style: {
                    headerStyle: appliedHeaderStyle,
                    subSubHeaderStyle: { ...appliedSubsubHeaderStyle, align: "left" },
                    normalStyle: appliedNormalStyle,
                },


            })




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