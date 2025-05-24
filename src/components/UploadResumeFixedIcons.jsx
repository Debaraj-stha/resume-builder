
import { Button } from './CustomComponents';
import FixedIconWrapper from './FixedIconWrapper';
import { useLayout } from '../provider/layoutProvider';
import { useCallback, useState } from 'react';
import { CircularIconHolder } from './elements/resumeSectionWrapper';
import { FaUpload } from 'react-icons/fa';
import ToolTip from './Tooltip';
import useHideOnScroll from '../helper/hooks/useHideOnScroll';
import { useParams } from 'react-router-dom';

const UploadResumeFixedIcons = () => {
    const [showIcons, setShowIcons] = useState(false)
    useHideOnScroll(setShowIcons)
    const { handleFilePick, fileInputRef, handleFileChange } = useLayout();
    const { layout_type, layout_id } = useParams()

    const handleClose = useCallback(() => {
        setShowIcons((prev) => !prev)
    }, [showIcons])


    return (
        <FixedIconWrapper showIcons={showIcons} setShowIcons={handleClose}>
            {
                showIcons && (
                    <div className="my-3">
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            accept="application/pdf"
                            data-layout-type={layout_type||""}
                            data-layout-id={layout_id||""}
                            onChange={handleFileChange}
                        />
                        <ToolTip text="upload resume">
                            <CircularIconHolder backgroundColor="#34A853" onClick={handleFilePick}>
                                <FaUpload />
                            </CircularIconHolder>
                        </ToolTip>

                    </div>
                )
            }
        </FixedIconWrapper>
    );
};

export default UploadResumeFixedIcons;
