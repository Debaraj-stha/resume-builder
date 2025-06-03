import React from 'react'
import { useDirectPDFWriter } from '../provider/DirectPDFWriter'
import {
  personalDetails,
  experiences,
  educations,
  summary,
  achievements,
  skills,
  strengths,
  passions,
  trainings,
  awards,
  certificates,
  openSourceWork,
  languages

} from "../static-data/resume-sample-data"
const DirectPDF = () => {
  const { createPDF } = useDirectPDFWriter()
  const createPDFDirectly = async () => {
    await createPDF({
      personalDetails,
      // experiences,
      // educations,
      // summary,
      // achievements,
      // skills,
      // strengths,
      // passions,
      // trainings,
      // awards,
      // certificates,
      // openSourceWork,
      languages


    },
      {},
      {
        personalDetailsProps: {},
        experiencesProps: { listStyle: "bullet", applyFlex: false },
        educationProps: {
          // applyFlex:true,
          // swapPosition:true,
          shouldIncludeIcon: true,
          shouldIncludeAddress: true,
          shouldIncludeDate: true,
          shouldIncludeGPA: true,
          applyVerticalDivider: true
        },
        achievementsProps: {
          shouldIncludeDate: true,
          // displayGrid:true,
          shouldIncludeIcon: true
        },
        skillsProps: {
          // shouldIncludeField:true,
          //  borderBox:true,
          borderBottom: true,
        },
        strengthsProps: {
          shouldIncludeIcon: true,
          // grid: true,
          side: ""
        },
        passionProps: {
          shouldIncludeIcon: true,
          // grid:true
        },
        trainingsProps: {
          includeLocation: true,
          includeDate: true,
          grid: true
        },
        awardsProps: {
          grid: true,
          includeDate: true
        },
        certificatesProps: {
          grid: true,
          shouldIncludeDate: true
        },
        openSourceWorkProps: {
          flexLinkAndDate: true,
          includeDate: true,
          includeLink: true,
          includeRole: false
        },
        languagesProps:{
          
        }

      },
    )
  }

  return (
    <div>
      <h1>Createing pdf directly</h1>
      <button onClick={createPDFDirectly}>create pdf directly</button>
    </div>
  )
}

export default DirectPDF
