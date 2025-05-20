import { memo } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { H3 } from "./CustomComponents";
const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #34a853;
  transition: width 0.3s ease;
  border-radius: 12px 0 0 12px;
`;
// Container for progress bar background
const ProgressBarContainer = styled.div`
  width: 300px;
  height: 25px;
  background-color: #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  margin: 20px 0;
`;
const ProgressBarModal = memo(({progress,message="Resume Generating..."}) => {
    return  <Modal header={<H3>{message}</H3>} onClose={() => { }}>
        <div style={{ textAlign: "center" }}>
            <ProgressBarContainer>
                <ProgressFill progress={progress} />
            </ProgressBarContainer>
            <H3>{progress} %</H3>
        </div>
    </Modal>

})
export default ProgressBarModal