import { memo, useState } from "react";
import styled from "styled-components";
import { useLayout } from "../provider/layoutProvider";
import { CircularIconHolder } from "./elements/resumeSectionWrapper";
import ToolTip from "./Tooltip";
import { FaDownLong } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useSupabase } from "../provider/supabaseProvider";

import ProgressBarModal from "./ModalWithProgressBar";

const FixedIconWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;



// Progress fill bar that adjusts width based on progress prop


const GeneratePageFixedButtons = memo(({ setShowIcons, saveData, showIcons }) => {
    const [fileGenerating, setFileGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const { generatePDF, complie_input } = useLayout();
    const { uploadFile } = useSupabase();

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

    



    return (
        <>
            <FixedIconWrapper>
                <ToolTip text="Show more icons">
                    <CircularIconHolder
                        backgroundColor="#1A73E8"
                        onClick={() => setShowIcons((prev) => !prev)}
                    >
                        {showIcons ? <MdExpandLess /> : <MdExpandMore />}
                    </CircularIconHolder>
                    <button onClick={() => saveData()}>Save data</button>
                </ToolTip>

                {showIcons && (
                    <>
                        <ToolTip text="Generate Resume">
                            <CircularIconHolder
                                backgroundColor="#34A853"
                                onClick={uploadAndDownloadFile}
                            >
                                <FaDownLong color="white" />
                            </CircularIconHolder>
                        </ToolTip>

                        <ToolTip text="Compile Now">
                            <CircularIconHolder
                                backgroundColor="#FBBC05"
                                onClick={complie_input}
                            >
                                <FaCogs color="white" />
                            </CircularIconHolder>
                        </ToolTip>
                    </>
                )}
            </FixedIconWrapper>
            {fileGenerating && <ProgressBarModal peogress={progress}/>}
        </>
    );
});

export default GeneratePageFixedButtons;
