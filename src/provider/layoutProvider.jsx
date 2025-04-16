import { useContext,createContext  } from "react";
export const LayoutContext=createContext(null)
export const useLayout=()=>useContext(LayoutContext)

const LayoutProvider=({children})=>{
    const values={}
    return(
        <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
    )
}
export default LayoutProvider