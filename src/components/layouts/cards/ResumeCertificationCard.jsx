import { memo } from "react"


const buildSimpeLayoutCertificationCard = ({ certificate, style ,...props}) => {
    const{side}=props
    const color=side==="right" && {color:"white"}
    return (
        <div>
            <div style={{ flex: "2" }}>
                <h3 style={{ ...style.h3,...color }}>{certificate.certificate}</h3>
            </div>
            <div style={{ flex: "7" }}>
                <p style={{ ...style.p,...color }}>{certificate.subject}</p>
                <p style={{ ...style.p,...color }}>{certificate.date}</p>
            </div>
        </div>
    )

}

const CertificationCard = memo(({ certificate,style,...props }) => {

        return buildSimpeLayoutCertificationCard({ certificate, style,...props})
    


})
export default CertificationCard