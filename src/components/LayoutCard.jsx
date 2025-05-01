import React, { memo } from "react";
const LayoutCard=memo(({children})=>{
    return(
        <div className=" templates bg-green-50 hover:bg-green-100 hover:border-2 border-green-500 hover:ring transition-all duration-300 pb-4  
        hover:translate-y-3 hover:scale-105 cursor-pointer">
        {children}
        
    </div>
    )
})
export default LayoutCard