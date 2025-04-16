import React from "react";
import { Heading, Hspace } from "./CustomComponents";
import { IconButton } from "./IconButton";
import { CgClose } from "react-icons/cg";
const ScrollableModal = React.memo(({ children, onClose, header }) => {
    return (
        <>
            <Hspace />
            <div className="absolute  z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 top-28 w-full left-0 pb-6 transition-all duration-300 hover:bg-gray-400" onClick={onClose}>
                <div className="bg-gray-700">
                    <div className="flex justify-between items-center content-center px-3">
                        {header ? header : <Heading>Scrollable Modal</Heading>}
                        <IconButton onClick={onClose}>
                            <CgClose />
                        </IconButton>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )

})
export default ScrollableModal