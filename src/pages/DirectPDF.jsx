import React from 'react'
import { useDirectPDFWriter } from '../provider/DirectPDFWriter'
import { personalDetails, experiences, educations, summary, achievements } from "../static-data/resume-sample-data"
const DirectPDF = () => {
  const { createPDF } = useDirectPDFWriter()
  const createPDFDirectly = async () => {
    await createPDF({
      personalDetails,
      experiences,
      educations,
      summary,
      achievements
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
          shouldIncludeGPA:true,
          applyVerticalDivider:true
        },
        achievementsProps:{
          shouldIncludeDate:true,
          // displayGrid:true,
          shouldIncludeIcon:true
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
