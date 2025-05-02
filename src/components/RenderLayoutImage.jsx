import { memo } from "react"
import LayoutCardWithDetails from "./LayoutCardWithDetails"
import LayoutGridWrapper from "./layouts/wrappers/LayoutGridWrapper"

const RenderLayoutImage = memo(({layouts,layoutDescription,currentPage,itemsPerPage,layout_type="all"}) => (
    <LayoutGridWrapper>
        {
            Object.entries(layouts)
                //slice the array based on current page
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map(([layoutName, imageSrc], index) => {
                    return (
                        <LayoutCardWithDetails
                         key={index} 
                         layoutName={layoutName} 
                         imageSRC={imageSrc}
                         layout_type={layout_type}
                         layout_id={index+1}
                          layoutDescription={layoutDescription[layoutName]} />

                    )
                })

        }

    </LayoutGridWrapper>
))

export default RenderLayoutImage