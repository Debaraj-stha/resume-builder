
import { Link } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';

const UploadResumeCard = ({ children }) => {

    return (
        <>
            <div className="resume-import-card">
                <div className="import-icon"><FiUploadCloud /></div>
                <div><strong>Already have a healthcare CV?</strong><p>Upload PDF or DOCX and let AI build an improved, verified draft for this editor.</p></div>
                <Link to="/ats-checker">Upload & improve with AI</Link>
            </div>
            {children}
        </>
    )
}

export default UploadResumeCard
