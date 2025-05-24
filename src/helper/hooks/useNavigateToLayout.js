import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useNavigateToLayout=()=>{
    const navigate=useNavigate()
    return useCallback((layout_type,layout_id)=>{
        console.log("clicked",layout_id,layout_type)
        navigate(`/build-resume/${layout_type}/${layout_id}`)
    },[navigate])
}
export default useNavigateToLayout