import  { memo } from 'react'
import styled from 'styled-components';
import { CircularIconHolder } from './elements/resumeSectionWrapper';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import ToolTip from './Tooltip';
const Wrapper = styled.div`
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

const FixedIconWrapper = memo(({children,showIcons,setShowIcons}) => {
    return (
        <Wrapper>
            <ToolTip text="Show more icons">
                <CircularIconHolder
                    backgroundColor="#1A73E8"
                    onClick={setShowIcons}
                >
                    {showIcons ? <MdExpandLess /> : <MdExpandMore />}
                </CircularIconHolder>
            </ToolTip>
            {children}
        </Wrapper>
    )
})

export default FixedIconWrapper
