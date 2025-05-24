
import { useParams } from 'react-router-dom';
import { useLayout } from '../provider/layoutProvider';
import { Button, H3 } from './CustomComponents'

const UploadResumeCard = ({ children }) => {

    const { handleFilePick, fileInputRef, handleFileChange } = useLayout();
    const { layout_type, layout_id } = useParams()

    return (
        <>
            <div className="mx-auto my-3 text-center flex flex-col items-center ">
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="application/pdf"
                    data-layout-type={layout_type || ""}
                    data-layout-id={layout_id || ""}
                    onChange={handleFileChange}
                />
                <H3 text-align="center" >Already have a resume? Upload it below and we'll help you create a new one.</H3>
                <Button onClick={handleFilePick}>Upload Resume</Button>
            </div>
            {children}
        </>
    )
}

export default UploadResumeCard
