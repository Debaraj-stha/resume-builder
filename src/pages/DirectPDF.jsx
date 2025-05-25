import React from 'react'
import { useDirectPDFWriter } from '../provider/DirectPDFWriter'

const DirectPDF = () => {
    const{createPDF}=useDirectPDFWriter()
  return (
    <div>
      <h1>Createing pdf directly</h1>
      <button onClick={createPDF}>create pdf directly</button>
    </div>
  )
}

export default DirectPDF
