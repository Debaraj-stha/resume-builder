import React from 'react'
import { useDirectPDFWriter } from '../provider/DirectPDFWriter'
import {personalDetails,experiences,educations} from "../static-data/resume-sample-data"
const DirectPDF = () => {
    const{createPDF}=useDirectPDFWriter()
    const createPDFDirectly = () => {
      createPDF({
        personalDetails,experiences,educations
      },
      {},
      {
        personalDetailsProps:{includeIcon:true}
      })
    }
  return (
    <div>
      <h1>Createing pdf directly</h1>
      <button onClick={createPDFDirectly}>create pdf directly</button>
    </div>
  )
}

export default DirectPDF
