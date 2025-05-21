import React, { memo } from "react"

import { IconHolder, Li, Ul } from "../../elements/resumeSectionWrapper"

//icons
import { BiMobile } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import { LiaLinkedin, LiaMapMarkerSolid } from "react-icons/lia"
import { BsGithub, BsGlobe } from "react-icons/bs"

import { Avatar, FlexBox } from "../../CustomComponents"
import styled from "styled-components"

const RectangularContainer = styled.div`
width:${({ width }) => width || "80px"};
height:${({ height }) => height || "80px"};
`

// LiaLinkSolid
const GenerateLi = ({ icon, text, style }) => {
    return (
        <Li {...style.profile_li}>
            <IconHolder>
                {icon}
            </IconHolder>
            <span style={{ color: style?.profile_li.color }}>
                {text}
            </span>
        </Li>
    )
}
const GenerateWebsiteURL = ({ urls, color, style

}) => {
    const iconMap = {
        linkedin: <LiaLinkedin />,
        github: <BsGithub />
    }
    return urls?.map((u, index) => {
        const url = u?.value?.trim()
        if (!url) return
        const lower = url.toLowerCase()
        const key = Object.keys(iconMap).find(k => lower.includes(k))
        //create copy of icon and add new props
        const icon = key
            ? React.cloneElement(iconMap[key], { color: style?.profile_li?.iconColor })
            : <BsGlobe color={style?.profile_li?.iconColor} />

        return (
            <GenerateLi
                key={index}
                icon={icon}
                text={url}
                color={color}
                style={style}
            />
        )
    }
    )
}

const GenerateContactList = ({ personalDetails, urls, style, color = "blue", }) => (
    <>
        <GenerateLi
            style={style}
            icon={<BiMobile color={style?.profile_li.iconColor}></BiMobile>} text={personalDetails.phone} color={color}></GenerateLi>
        <GenerateLi

            style={style}
            icon={<MdEmail color={style?.profile_li.iconColor}></MdEmail>} text={personalDetails.email} color={color}></GenerateLi>
        <GenerateWebsiteURL
            style={style}
            urls={urls || personalDetails.urls} color={color} />
        {/* <GenerateLi icon={<LiaLinkedin color="blue"></LiaLinkedin>} text={personalDetails.linkedin}></GenerateLi> */}
    </>
)
const AddressWithMarker = ({ address, style, size = 18, iconColor }) => (
    <div className="flex items-center">
        <LiaMapMarkerSolid color={iconColor} size={size} />
        <p style={{ ...style }}>{address}</p>
    </div>
)

const generateContactListWithoutIcon = ({ contactInfos, style }) => (

    contactInfos.map((contact, index) => (
        <Li key={index} style={{ ...style }}>{contact}</Li>
    ))

)
const generateResumeHeader = ({ personalDetails, style, props }) => {
    const { name, address, urls, profession, email, phone } = personalDetails
    const { flexImage,
        shouldIncludeProfession = true,
        shouldIncludeAddress,
        shouldIncludeIcon,
        rectangularImage,
        shouldIncludeImage ,
        isStatic //if static image is passed
    } = props
    const urlValue = urls?.map((url) => url?.value) || [];
    let { profile } = personalDetails;
    let imageUrl = null;
    if(isStatic){
        if(!Array.isArray(profile)){
            profile=[profile]
            imageUrl=profile[0]
        }
    }
    else{
        if (profile && profile.length > 0) {
            imageUrl = URL.createObjectURL(profile[0]);
        }
    }





    const Address = shouldIncludeAddress && (
        <AddressWithMarker address={address} style={style.profile_li} iconColor={style?.profile_li.iconColor}
            fontSize={style.p.fontSize} />)

    const ContactList = <Ul margin="0"{...style.profile_ul}>

        {
            shouldIncludeIcon ? <GenerateContactList personalDetails={personalDetails} color={style.p.color}
                style={style}
            /> :
                generateContactListWithoutIcon({ contactInfos: [phone, email, ...urlValue, address], style: style.profile_li })}
    </Ul>

    const Profession = shouldIncludeProfession && <h2 style={{ ...style?.titleStyle }}>{profession}</h2>
    const Image = <img src={`${imageUrl}`} alt="image"></img>
    const RoundedImage = <div className="flex justify-center items-center content-center"><Avatar margin="0">{Image}</Avatar></div>
    const RectangularImage = <RectangularContainer>{Image}</RectangularContainer>
    const Name = <h1 style={{ ...style?.nameStyle }}>{name}</h1>
    if (flexImage && shouldIncludeImage) {
        return (
            <FlexBox backgroundColor={style.headerBg} margin="0"
                padding={style.headerBg ? "20mm 20mm 10mm 20mm" : "0"}
                justifyContent="space-between">
                <div>
                    {Name}
                    {Profession}
                    {ContactList}
                    {Address}
                </div>
                {
                    rectangularImage ? RectangularImage : RoundedImage
                }
            </FlexBox>
        )
    }
    return (
        <div>
            {
                shouldIncludeImage && RoundedImage
            }
            {Name}
            {Profession}
            {ContactList}
            {Address}
        </div>
    )

}

const ResumeHeader = memo(({ personalDetails, style, ...props }) => {
    return generateResumeHeader({ personalDetails, style, props })

})
export default ResumeHeader