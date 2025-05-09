
import renderUI from "../render-ui";
const renderClassicalUI=({pages,key_val,layout_type,layoutId,sectionRefs})=>{
    console.log("pag elength",pages)
    console.log("layout id",layoutId)
return renderUI({pages,key_val,layoutId,layout_type,sectionRefs})
}

export default renderClassicalUI