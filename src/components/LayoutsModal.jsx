import {  useEffect, useState } from 'react'
import { all_layouts_image_map } from './LayoutImages'
import BigModal from './BigModal'
import { H2, H3 } from './CustomComponents'
import { GridThree } from './layouts/input-layout/GridCards'
import { LineDivider } from './Divider/TransparentDividers'
import { useTheme } from 'styled-components'

import useNavigateToLayout from '../helper/hooks/useNavigateToLayout'
import { useLayout } from '../provider/layoutProvider'
import { Loader } from './Loading'



const LayoutsModal = () => {
    const [loading, setLoading] = useState(true)
    const theme = useTheme()
    const navigate = useNavigateToLayout()
    const {
        closeLayoutChooseModal,
        isLayoutChooseModalOpen
    } = useLayout()
    useEffect(() => {
        if (!isLayoutChooseModalOpen) return;
        setLoading(true)
        const timer = setTimeout(() => setLoading(false), 800)
        return () => clearTimeout(timer)
    }, [isLayoutChooseModalOpen])
    if (!isLayoutChooseModalOpen) return null
    return (
        <BigModal header="Pick one layout" bgClass="bg-gray-600" onClose={closeLayoutChooseModal}>
            {loading ? (
                <div className='min-h-64 pt-10'>
                    <Loader />
                    <H3 color='white'>Loading...</H3>
                </div>
            ) : (
                <div>
                    {Object.entries(all_layouts_image_map).map(([category, imageMap], outerIndex) => {
                        const layoutEntries = Object.entries(imageMap);
                        const grouped = [];
                        for (let i = 0; i < layoutEntries.length; i += 3) {
                            grouped.push(layoutEntries.slice(i, i + 3));
                        }

                        return (
                            <div key={outerIndex}>
                                <H2 color={theme.colors.accent}>{category}</H2>
                                <LineDivider backgroundColor="white" />
                                {grouped.map((group, rowIndex) => (
                                    <div className='cursor-pointer' key={`${outerIndex}-${rowIndex}`}>
                                        <GridThree>
                                            {group.map(([layout_name, imageSRC], index) => (
                                                <div
                                                    key={`${outerIndex}-${rowIndex}-${index}`}
                                                    onClick={() => navigate(category, index + 1)}
                                                >
                                                    <H3 color='white'>{layout_name}</H3>
                                                    <img loading='lazy' alt={layout_name} src={imageSRC} />
                                                </div>
                                            ))}
                                        </GridThree>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            )}
        </BigModal>
    )
}

export default LayoutsModal