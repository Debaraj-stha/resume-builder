import { memo, useEffect } from "react";
import { H1 } from "./elements/resumeSectionWrapper";
import { Button, FlexBox } from "./CustomComponents";
import LayoutCardWithDetails from "./LayoutCardWithDetails";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styled, { useTheme } from "styled-components";
import { usePagination } from "../provider/paginationProvider";
import ToolTip from "../components/Tooltip"
import LayoutGridWrapper from "./layouts/wrappers/LayoutGridWrapper";

const PositionedDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  ${({ left }) => left && `left: ${left};`}
  ${({ right }) => right && `right: ${right};`}

  @media (max-width: 768px) {
    ${({ left }) => left && `left: 10px;`}
    ${({ right }) => right && `right: 10px;`}
  }
`;


const MostUsedLayouts = memo(({ layout_image_map, layout_descriptions }) => {

    const {
        currentPage,
        handlePageChange,
        setItemsLength,
        itemPerPage,
        pages
    } = usePagination()
    const totalPages = pages.length


    const handleNext = () => {
        const nextPage = currentPage + 1;
        handlePageChange(nextPage);
    };

    const handlePrev = () => {
        const prevPage = currentPage - 1;
        handlePageChange(prevPage);
    };


    useEffect(() => {
        const length = Object.keys(layout_image_map).length
        setItemsLength(length)
    }, [])

    const theme = useTheme()

    return (
        <div className="my-5 relative">
            <div className="my-3">
                <H1 fontWeight="700" color={theme.colors.text}>Most popular among users</H1>
            </div>
            <FlexBox justifyContent="space-between">
                <PositionedDiv left="-100px">
                    <ToolTip text="Previous Page">
                        <Button onClick={handlePrev} disabled={currentPage == 1}><FaAngleLeft /></Button>
                    </ToolTip>
                </PositionedDiv>
                <PositionedDiv right="-100px">
                    <ToolTip text="Next Page">
                        <Button onClick={handleNext} disabled={currentPage == totalPages}><FaAngleRight /></Button>
                    </ToolTip>
                </PositionedDiv>
            </FlexBox>
            <LayoutGridWrapper>
                {
                    Object.entries(layout_image_map).slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map(([layoutName, imageSRC], index) => {
                        return <LayoutCardWithDetails
                            key={index}
                            imageSRC={imageSRC}
                            layoutName={layoutName}
                            // layoutDescription={layout_descriptions[layoutName]}
                            includeUserCount={true}
                            userCount={100}
                        />
                    })
                }

            </LayoutGridWrapper>
        </div>
    )
})
export default MostUsedLayouts