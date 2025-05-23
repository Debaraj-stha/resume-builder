import { memo, useState } from "react";
import styled from "styled-components";
import { useLayout } from "../provider/layoutProvider";
import { CircularIconHolder, P } from "./elements/resumeSectionWrapper";
import ToolTip from "./Tooltip";
;
import { FaCogs, FaDownload } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdPalette } from "react-icons/md";
import { useSupabase } from "../provider/supabaseProvider";

import ProgressBarModal from "./ModalWithProgressBar";
import { RxDividerHorizontal } from "react-icons/rx";
import { H3 } from "./CustomComponents";
import { useDivider } from "../provider/DividerProvider";
import BigModal from "./BigModal";
import { GridTwo } from "./layouts/input-layout/GridCards";
import { useParams } from "react-router-dom";
import DifferentLayoutHolder from "./DifferentLayoutHolder";

const FixedIconWrapper = styled.div`
  position: fixed;
  right: 3%;
  bottom:10%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background:#2c00ff33;
  padding: 10px;
  border-radius: 10px;
  z-index: 111111;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    &:hover {
    opacity: 0.8;
    }
`;


const GeneratePageFixedButtons = memo(({ setShowIcons, showIcons,setIsTemplateChangeModelOpen }) => {
    const [fileGenerating, setFileGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDividerChangeModelOpen, setIsDividerChangeModelOpen] = useState(false)

    const { generatePDF, compileInput } = useLayout();
    const { uploadFile } = useSupabase();
    const { dividers, changeDivider } = useDivider()
    

    const uploadAndDownloadFile = async () => {
        try {
            setFileGenerating(true);
            const file = await generatePDF();
            await uploadFile(file, (progressValue) => {
                setProgress(progressValue);
                if (progressValue >= 100) {
                    setTimeout(() => {
                        setFileGenerating(false);
                        setProgress(0);
                    }, 800);
                }
            });

        } catch (error) {
            console.log("Error while uploading and downloading file", error);
            setFileGenerating(false);
            setProgress(0)
        }
    };
    const handleTemplatesChoose = () => {
        setIsTemplateChangeModelOpen(true)
    }
  
    const handleDividerChange = (key) => {
        changeDivider(key);
        setIsDividerChangeModelOpen(false); //  auto-close on selection
    }

    const dividerChooseModal = (
        <BigModal
            header={<H3 color="black">Choose Divider</H3>}
            onClose={() => setIsDividerChangeModelOpen(false)}
            bg="#eee"
            footer={<P color="black">Click on a divider to select it</P>}
        >
            <div className="m-2">
                <P color="black">Choose a divider for your resume</P>
                <GridTwo>
                    {Object.entries(dividers).map(([key, DividerComponent]) => (
                        <div
                            key={key}
                            onClick={() => handleDividerChange(key)}
                            className="border-2 border-gray-300 p-1 bg-gray-100 hover:bg-gray-200 rounded m-1 shadow duration-300 hover:translate-y-1 cursor-pointer py-2"
                        >
                            <P color="black">{key}</P>
                            <div className="my-2">{DividerComponent}</div>
                        </div>
                    ))}
                </GridTwo>
            </div>
        </BigModal>
    );




    return (
        <>
            <FixedIconWrapper>
                <ToolTip text="Show more icons">
                    <CircularIconHolder
                        backgroundColor="#1A73E8"
                        onClick={setShowIcons}
                    >
                        {showIcons ? <MdExpandLess /> : <MdExpandMore />}
                    </CircularIconHolder>

                </ToolTip>
                {showIcons && (
                    <>
                        <ToolTip text="Generate Resume">
                            <CircularIconHolder backgroundColor="#34A853" onClick={uploadAndDownloadFile}>
                                <FaDownload color="white" />
                            </CircularIconHolder>
                        </ToolTip>

                        <ToolTip text="Compile Now">
                            <CircularIconHolder backgroundColor="#FBBC05" onClick={compileInput}>
                                <FaCogs color="white" />
                            </CircularIconHolder>
                        </ToolTip>

                        <ToolTip text="Try on different templates">
                            <CircularIconHolder backgroundColor="#A142F4" onClick={handleTemplatesChoose}>
                                <MdPalette color="white" />
                            </CircularIconHolder>
                        </ToolTip>

                        <ToolTip text="Change Divider">
                            <CircularIconHolder backgroundColor="#5F6368" onClick={()=> setIsDividerChangeModelOpen(true)}>
                                <RxDividerHorizontal color="white" />
                            </CircularIconHolder>
                        </ToolTip>
                    </>
                )}

            </FixedIconWrapper>
            {fileGenerating && <ProgressBarModal peogress={progress} />}
            {isDividerChangeModelOpen && dividerChooseModal}
           

        </>
    );
});

export default GeneratePageFixedButtons;
