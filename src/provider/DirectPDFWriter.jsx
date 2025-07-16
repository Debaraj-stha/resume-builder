import { createContext, useCallback, useContext, useMemo } from "react";

import jsPDF from "jspdf";
import { nameStyle, headerStyle, subHeaderStyle, normalStyle, subSubHeaderStyle } from "../helper/pdf/style";
import standardPDFLayout from "../helper/pdf/pdf-layout/standard";
import twoColumnPDFLayout from "../helper/pdf/pdf-layout/two_column";
const DirectPDFContext = createContext()

const DirectPDFWriterProvider = ({ children }) => {
    const defaultSectionProps = {
        personalDetailsProps: {},
        experiencesProps: {

        },
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
        const defaultPagePadding = {
            top: 40,
            left: 40,
            right: 40,
            bottom: 40
        }
        const { commonProps = {}, pagePadding} = props
        const mergedPadding={...defaultPagePadding,...(pagePadding||{})}
        
        console.log("merged padding",mergedPadding)

        console.log("creating pdf...")
        const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" })
        const { columnLayout = false } = commonProps
        const updatedProps = { ...props, currentPos, defaultStyles, defaultSectionProps, pagePadding:mergedPadding }
        if (columnLayout) {
            await twoColumnPDFLayout(pdf, sections, styles, updatedProps)
        }
        else {
            await standardPDFLayout(pdf, sections, styles, updatedProps)
        }


        const now = Date.now()
        const filename = `resume-${now}.pdf`
        pdf.save(filename)
        const blob = pdf.output("blob")
        const pdfFile = new File([blob], filename, { type: 'application/pdf' });
        return pdfFile
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