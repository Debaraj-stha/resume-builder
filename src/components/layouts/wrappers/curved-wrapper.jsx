
import wave1 from "../../../assets/wave1.svg";
import bottom_wave_1 from "../../../assets/bottom_wave_1.svg";
import { CreativeResumeWrapper1 } from "../../elements/resumeWrapper";
const CurvedWrapper = ({ children }) => (
    <CreativeResumeWrapper1>
        <div className="top-curve">
            <img src={wave1} alt="Top Curve" />
        </div>

        <div className="content" style={{ padding: "20mm", position: "relative", zIndex: 10 }}>
            {children}
        </div>


        <div className="bottom-curve">
            <img src={
                bottom_wave_1
            } alt="Bottom Curve" />
        </div>
    </CreativeResumeWrapper1>
)

export default CurvedWrapper

