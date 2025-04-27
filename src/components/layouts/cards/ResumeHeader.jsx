import { memo } from "react"

import { IconHolder, Li, P, Ul, H1, H3, H2 } from "../../elements/resumeSectionWrapper"

//icons
import { BiMobile } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import { LiaLinkedin, LiaLinkSolid, LiaMapMarkerSolid } from "react-icons/lia"
import { BsGithub, BsGlobe } from "react-icons/bs"
import { layout_type_map } from "../../../constant"
import { Avatar, FlexBox } from "../../CustomComponents"
import styled from "styled-components"

const RectangularContainer = styled.div`
width:${({ width }) => width || "70px"};
height:${({ height }) => height || "70px"};
`

// LiaLinkSolid
const GenerateLi = ({ icon, text, fontWeight = "normal", color = "black",style }) => {
    return (
        <Li {...style}>
            <IconHolder>
                {icon}
            </IconHolder>
            <span style={{ fontWeight: fontWeight, color: color }}>
                {text}
            </span>
        </Li>
    )
}
const GenerateWebsiteURL = ({ urls, color,style

 }) => urls.map((u, index) => {
    if (u.includes("linkedin")) {
        return (
            <GenerateLi 
            style={style}
            key={index} icon={<LiaLinkedin color={color}></LiaLinkedin>} text={u} color={color}></GenerateLi>
        )
    }
    else if (u.includes("github")) {
        return (
            <GenerateLi 
            style={style}
            key={index} icon={<BsGithub color={color}></BsGithub>} text={u} color={color}></GenerateLi>
        )
    }
    else {
        return (
            <GenerateLi
            style={style}
            key={index} icon={<BsGlobe color={color}></BsGlobe>} text={u} color={color}></GenerateLi>
        )
    }
}
)

const GenerateContactList = ({ personalDetails, urls, color = "blue",
    style
 }) => (
    <>
        <GenerateLi
        style={style}
        icon={<BiMobile color={color}></BiMobile>} text={personalDetails.phone} color={color}></GenerateLi>
        <GenerateLi 
        
        style={style}
        icon={<MdEmail color={color}></MdEmail>} text={personalDetails.email} color={color}></GenerateLi>
        <GenerateWebsiteURL 
        style={style}
        urls={urls || personalDetails.urls} color={color} />
        {/* <GenerateLi icon={<LiaLinkedin color="blue"></LiaLinkedin>} text={personalDetails.linkedin}></GenerateLi> */}
    </>
)
const AddressWithMarker = ({ address, fontWeight = "500", color = "black", size = 18, fontSize = "15px" }) => (
    <div className="flex items-center">
        <LiaMapMarkerSolid color={color} size={size} />
        <P fontWeight={fontWeight} color={color}>{address}</P>
    </div>
)

const generateContactListWithoutIcon = ({ contactInfos }) => (

    contactInfos.map((contact, index) => (
        <Li key={index}>{contact}</Li>
    ))

)
const generateResumeHeader = ({ personalDetails, layout_no, shouldIncludeImage, style, shouldIncludeIcon }) => {
    const { name, address, profile, urls, profession, email, phone } = personalDetails
console.log(shouldIncludeIcon,shouldIncludeImage)
    return (
        <div>
            {/* {
                shouldIncludeImage && (<Avatar><img src={`${profile[1]}`} alt="image"></img></Avatar>)
            } */}
            <h1 style={{ ...style?.nameStyle }}>{name}</h1>
            <h2 style={{ ...style?.h2 }}>{profession}</h2>
            <Ul margin="0"  {...style.ul}>

                {
                    shouldIncludeIcon ? <GenerateContactList personalDetails={personalDetails} color={style.p.color}
                    style={style?.li_style}
                    /> :
                        generateContactListWithoutIcon({ contactInfos: [phone, email, ...urls, address] })}
            </Ul>
            {
                shouldIncludeIcon  &&  <AddressWithMarker address={address} color={style.p.color} fontSize={style.p.fontSize} />
            }
            
        </div>
    )

}

const ResumeHeader = ({ personalDetails, layout_no, style, layout_type = "classical", ...props})=>{
    console.log("props",props)
    return generateResumeHeader({personalDetails,layout_no,style,...props})

}
export default ResumeHeader