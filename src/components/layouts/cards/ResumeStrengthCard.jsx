import { layout_type_map } from "../../../constant"

import { H1, H2, P } from "../../elements/resumeSectionWrapper"
const generateModernStrengthCard=({strengths,layout_no,style})=>{
    switch(layout_no){
        case 3:
            return(
                <>
              {
                strengths.slice(0,2).map((strength,index)=>(
                    <div key={index} className="text-left">
                          <H2 fontFamily="'Roboto', sans-serif" color="#0f0771" textAlign="left" fontWeight="normal" fontSize="18px" >{strength.title}</H2>
                          <P fontFamily="Roboto" fontSize="14px">{strength.description}</P>
                    </div>
                ))
              }
                </>
            )
        case 5:
            return(
                <>
                {
                    strengths.slice(0,1).map((strength,index)=>(
                        <div key={index} className="text-left">
                            <h2 style={{...style.h2}}>{strength.title}</h2>
                            <p style={{...style.p}}>{strength.description}</p>
                        </div>
                    ))
                }
                </>
            )
        default:
            return (
                <>
                <h1>default strength</h1>
                </>
            )
    }

}
const StrengthCard=({strengths,layout_no,layout_type="modern",style})=>{
    console.log("strength layout no",layout_no)
    if(layout_type===layout_type_map.MODERN){
        return generateModernStrengthCard({strengths,layout_no,style})
    }
}
export default StrengthCard