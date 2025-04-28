import { memo } from "react"
import { H2, H3, P } from "../../elements/resumeSectionWrapper"

const buildSimpeLayoutCertificationCArd = ({ certificate, layout_no, style }) => {
    return (
        <div>
            <div style={{ flex: "2" }}>
                <h3 style={{ ...style.h3 }}>{certificate.certificate}</h3>
            </div>
            <div style={{ flex: "7" }}>
                <p style={{ ...style.p }}>{certificate.subject}</p>
                <p style={{ ...style.p }}>{certificate.date}</p>
            </div>
        </div>
    )

}

const CertificationCard = memo(({ certificate, layout_no, layout_type = "classical",style }) => {

        return buildSimpeLayoutCertificationCArd({ certificate, layout_no ,style})
    


})
export default CertificationCard