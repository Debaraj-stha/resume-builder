import { memo } from "react"


const buildSimpeLayoutCertificationCArd = ({ certificate, style }) => {
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

const CertificationCard = memo(({ certificate,style,...props }) => {

        return buildSimpeLayoutCertificationCArd({ certificate, style,...props})
    


})
export default CertificationCard