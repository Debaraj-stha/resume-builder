import { memo } from "react";
import styled from "styled-components";
import { useLayout } from "../provider/layoutProvider";
import { CircularIconHolder } from "./elements/resumeSectionWrapper";
import ToolTip from "./Tooltip";
import { FaDownLong } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const FixedIconWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`;
const GeneratePageFixedButtons = memo(({setShowIcons,saveData,showIcons}) => {
    const{generatePDF,complie_input}=useLayout()
    return (
        <FixedIconWrapper>
            <ToolTip text="Show more icons">
                <CircularIconHolder
                    backgroundColor="#1A73E8"
                    onClick={() => setShowIcons(prev => !prev)}
                >
                    {showIcons ? <MdExpandLess /> : <MdExpandMore />}
                </CircularIconHolder>
                <button onClick={()=>saveData()}>Save data</button>
            </ToolTip>


            {showIcons && (
                <>
                    <ToolTip text="Download Resume">
                        <CircularIconHolder
                            backgroundColor="#34A853"
                            onClick={generatePDF}
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
    )
})
export default GeneratePageFixedButtons