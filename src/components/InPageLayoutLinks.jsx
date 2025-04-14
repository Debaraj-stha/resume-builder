import React from "react";
import { MdDashboard } from 'react-icons/md';
import { FaCubes, FaPaintBrush } from 'react-icons/fa';
import { BiRectangle } from 'react-icons/bi';
import { HiOutlineDocumentText } from "react-icons/hi";
import { IconHolder } from "./elements/resumeSectionWrapper";

const InPageLayoutLinks = () => {
    return (
        <div className="fixed top-24 left-0 mt-4  w-full z-[999] bg-white shadow-md py-4 px-4 flex flex-wrap gap-4 justify-center">

            <div className="flex items-center gap-2 bg-green-100 p-2 text-black rounded">
                <IconHolder backgroundColor="rgba(0,255,0,0.7)" padding="10px" borderRadius="10px">
                    <MdDashboard color="white" />
                </IconHolder>
                <a href="#all-templates">All Templates</a>
            </div>

            <div className="flex items-center gap-2 bg-green-100 p-2 text-black rounded">
                <IconHolder backgroundColor="rgba(0,128,0,0.7)" padding="10px" borderRadius="10px">
                    <HiOutlineDocumentText color="white" />
                </IconHolder>
                <a href="#classical">Classical Templates</a>
            </div>

            <div className="flex items-center gap-2 bg-blue-100 p-2 text-black rounded">
                <IconHolder backgroundColor="rgba(0,0,255,0.7)" padding="10px" borderRadius="10px">
                    <FaCubes color="white" />
                </IconHolder>
                <a href="#modern">Modern Templates</a>
            </div>

            <div className="flex items-center gap-2 bg-pink-100 p-2 text-black rounded">
                <IconHolder backgroundColor="rgba(255,99,132,0.7)" padding="10px" borderRadius="10px">
                    <FaPaintBrush color="white" />
                </IconHolder>
                <a href="#creative">Creative Templates</a>
            </div>

            <div className="flex items-center gap-2 bg-yellow-100 p-2 text-black rounded">
                <IconHolder backgroundColor="rgba(255,206,86,0.7)" padding="10px" borderRadius="10px">
                    <BiRectangle color="white" />
                </IconHolder>
                <a href="#simple">Simple Templates</a>
            </div>
        </div>
    )
}
export default InPageLayoutLinks