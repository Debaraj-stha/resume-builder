import { memo } from "react"

import { IconHolder, Li, P, Ul, H1, H3, H2 } from "../../elements/resumeSectionWrapper"
//styles
import style from "../classic/style/layout1_style.json"
import style2 from "../classic/style/layout2_style.json"
import style3 from "../classic/style/layout3_style.json"
//icons
import { BiMobile } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import { LiaLinkedin, LiaLinkSolid, LiaMapMarkerSolid } from "react-icons/lia"
import { BsGithub, BsGlobe } from "react-icons/bs"
import { layout_type_map } from "../../../constant"
import { Avatar, FlexBox } from "../../CustomComponents"

// LiaLinkSolid
const GenerateLi = ({ icon, text, fontWeight = "normal" }) => {
    return (
        <Li display={style2.ResumeHeader.li.display} justifyContent={style2.ResumeHeader.li.justifyContent} alignItems={style2.ResumeHeader.li.alignItems} >
            <IconHolder>
                {icon}
            </IconHolder>
            <span style={{ fontWeight: fontWeight }}>
                {text}
            </span>
        </Li>
    )
}
const GenerateWebsiteURL = ({ urls, color }) => urls.map((u, index) => {
    if (u.includes("linkedin")) {
        return (
            <GenerateLi key={index} icon={<LiaLinkedin color={color}></LiaLinkedin>} text={u}></GenerateLi>
        )
    }
    else if (u.includes("github")) {
        return (
            <GenerateLi key={index} icon={<BsGithub color={color}></BsGithub>} text={u}></GenerateLi>
        )
    }
    else {
        return (
            <GenerateLi key={index} icon={<BsGlobe color={color}></BsGlobe>} text={u}></GenerateLi>
        )
    }
}
)

const GenerateContactList = ({ personalDetails, urls, color = "blue" }) => (
    <>
        <GenerateLi icon={<BiMobile color={color}></BiMobile>} text={personalDetails.phone}></GenerateLi>
        <GenerateLi icon={<MdEmail color={color}></MdEmail>} text={personalDetails.email}></GenerateLi>
        <GenerateWebsiteURL urls={urls || personalDetails.urls} color={color} />
        {/* <GenerateLi icon={<LiaLinkedin color="blue"></LiaLinkedin>} text={personalDetails.linkedin}></GenerateLi> */}
    </>
)
const AddressWithMarker = ({ address, fontWeight = "500" }) => (
    <div className="flex items-center">
        <LiaMapMarkerSolid />
        <span style={{ fontWeight: fontWeight }}>{address}</span>
    </div>
)
const generateClassicResumeHeader = ({ personalDetails, layout_no }) => {
    switch (layout_no) {
        case 2:
            return (
                <>
                    <H1 fontSize={style2.ResumeHeader.name.fontSize} fontWeight={style2.ResumeHeader.name.fontWeight} textAlign={style2.ResumeHeader.name.textAlign}>{personalDetails.name}</H1>
                    <H1 fontWeight={style2.ResumeHeader.profession.fontWeight} fontSize={style2.ResumeHeader.profession.fontSize} color={style2.ResumeHeader.profession.color} textAlign={style2.ResumeHeader.profession.textAlign}>{personalDetails.profession}</H1>
                    <Ul justifyContent={style2.ResumeHeader.ul.justifyContent} listStyle={style2.ResumeHeader.ul.listStyle}>
                        <GenerateContactList personalDetails={personalDetails} />
                        {/* <GenerateLi icon={<LiaLinkedin color="blue"></LiaLinkedin>} text={personalDetails.linkedin}></GenerateLi> */}
                    </Ul>
                    <P className={style2.ResumeHeader.p.className.join(" ")}>{personalDetails.address}</P>
                </>
            )
        case 3:
            return (
                <>
                    <H1 fontSize={style3.ResumeHeader.name.fontSize} fontWeight={style2.ResumeHeader.name.fontWeight} fontFamily={style3.ResumeHeader.name.fontFamily} >{personalDetails.name}</H1>
                    <H1 fontWeight={style3.ResumeHeader.profession.fontWeight} fontSize={style3.ResumeHeader.profession.fontSize} color={style3.ResumeHeader.profession.color} fontFamily={style3.ResumeHeader.profession.fontFamily}>{personalDetails.profession}</H1>
                    <Ul display="flex" listStyle={style2.ResumeHeader.ul.listStyle}>
                        <Li>{personalDetails.phone}</Li>
                        <Li>{personalDetails.email}</Li>
                        <Li>{personalDetails.github}/</Li>
                    </Ul>
                    <P textAlign={style.ResumeHeader.address.textAlign}>{personalDetails.address}</P>
                </>
            )
        case 4:
            return (
                <>
                    <H1 fontSize={style.ResumeHeader.name.fontSize} fontWeight={style.ResumeHeader.name.fontWeight} textAlign="left"
                        fontFamily="Montserrat, sans-serif"
                    >{personalDetails.name}</H1>
                    <Ul justifyContent="space-between">
                        <GenerateLi icon={<BiMobile color="blue"></BiMobile>} text={personalDetails.phone} fontWeight="bold"></GenerateLi>
                        <GenerateLi icon={<MdEmail color="blue"></MdEmail>} text={personalDetails.email} fontWeight="bold"></GenerateLi>
                        <GenerateLi icon={<LiaLinkSolid color="blue"></LiaLinkSolid>} text={personalDetails.urls[0]} fontWeight="bold"></GenerateLi>
                    </Ul>

                </>
            )
        case 5:
            return (
                <>
                    <H1 fontSize={style.ResumeHeader.name.fontSize} fontWeight="800" textAlign="left"
                        fontFamily="Suranna"
                    >{personalDetails.name}</H1>
                    <Ul justifyContent="start">
                        <Li display="block" fontWeight="bold">{personalDetails.phone}</Li>
                        <Li display="block" fontWeight="bold">{personalDetails.email}</Li>
                        <Li display="block" fontWeight="bold">{personalDetails.urls[0]}/</Li>
                        <Li display="block" fontWeight="bold">{personalDetails.address}/</Li>
                    </Ul>

                </>
            )
        case 6:
            return (
                <>
                    <H1 fontSize={style.ResumeHeader.name.fontSize} fontWeight={style.ResumeHeader.name.fontWeight} textAlign="left" fontFamily="Lato">{personalDetails.name}</H1>
                    <Ul justifyContent="space-between" margin="0">
                        <GenerateLi icon={<BiMobile color="black"></BiMobile>} text={personalDetails.phone} fontWeight="bold"></GenerateLi>
                        <GenerateLi icon={<MdEmail color="black"></MdEmail>} text={personalDetails.email} fontWeight="bold"></GenerateLi>
                        <GenerateLi icon={<LiaLinkSolid color="black"></LiaLinkSolid>} text={personalDetails.urls[0]} fontWeight="bold"></GenerateLi>
                    </Ul>
                    <AddressWithMarker />
                </>
            )
        default:
            console.log("hit default resume card")
            return (
                <>
                    <H1 fontSize={style.ResumeHeader.name.fontSize} fontWeight={style.ResumeHeader.name.fontWeight}>{personalDetails.name}</H1>
                    <H1 fontWeight={style.ResumeHeader.profession.fontWeight} fontSize={style.ResumeHeader.profession.fontSize}>{personalDetails.profession}</H1>
                    <Ul>
                        <Li>{personalDetails.phone}</Li>
                        <Li>{personalDetails.email}</Li>
                        {personalDetails.urls.map((u, index) => (
                            <Li key={index}>{u}</Li>
                        ))}
                    </Ul>
                    <P textAlign={style.ResumeHeader.address.textAlign}>{personalDetails.address}</P>
                </>

            )

    }
}

const generateModernResumeHeader = ({ personalDetails, layout_no }) => {
    const { urls, name, phone, email, profession, address, profile } = personalDetails
    switch (layout_no) {
        case 1:
            return (
                <>
                    <H1 fontWeight="600" fontFamily="Lato, sans-serif" textAlign="left">{name}</H1>
                    <H3 color="blue" textAlign="left" fontWeight="500">{profession}</H3>
                    <Ul justifyContent="start" margin="0">
                        <GenerateContactList personalDetails={personalDetails} urls={[urls[0]]} color="black" />
                    </Ul>
                    <AddressWithMarker address={address} />
                </>
            )
        case 2:
            return (
                <>
                   <FlexBox>
                    <div>
                    <H1 fontFamily="'Raleway', sans-serif" color="#044627" textAlign="left">{name}</H1>
                    <H2 color="#4bdd97" fontFamily="'Raleway', sans-serif" fontWeight="500" textAlign="left">{profession}</H2>
                    <Ul justifyContent="start">
                        <GenerateContactList color="black" personalDetails={personalDetails} />
                    </Ul>
                    </div>
                    <div>
                        <Avatar>
                            <img src={`${profile}`} alt="image"></img>
                        </Avatar>
                    </div>
                   </FlexBox>
                </>
            )

        /*

        */
        default:
            return <h1>Default resume header</h1>
    }

}
const ResumeHeader = memo(({ personalDetails, layout_no, layout_type = "classical" }) => {
    console.log("layout_no resume header", layout_no)


    if (layout_type === layout_type_map.CLASSICAL) {
        return generateClassicResumeHeader({ personalDetails, layout_no })
    }
    if (layout_type == layout_type_map.MODERN) {
        return generateModernResumeHeader({ personalDetails, layout_no })
    }


})
export default ResumeHeader