import React from "react";
import RoundedIcon from "./RoundedIcon";
import { H1, H3 } from "./CustomComponents";
import { BiErrorCircle } from "react-icons/bi";
import ModalFooter from "./ModalFooter";
import Modal from "./Modal";
import { useTheme } from "styled-components";
import { FcOk } from "react-icons/fc";
const ErrorSuccessModal = ({ onClose, text = "", isSuccessModal = false }) => {
    const theme = useTheme()
    return (
        <Modal footer={<ModalFooter onClose={onClose} shouldShowcancel={false} />} onClose={onClose} >
            <div className="flex items-center justify-center my-3 gap-4">
                <RoundedIcon background={isSuccessModal ? "green" : "red"}>
                    {
                        isSuccessModal ?
                            (
                                <>
                                    <FcOk color={theme.colors.icons?.default?.colors || "#fff"}
                                        size={60} />
                                </>
                            ) : (
                                <BiErrorCircle
                                    color={theme.colors.icons?.default?.colors || "#fff"}
                                    size={60}
                                />
                            )
                    }

                </RoundedIcon>
                <H1>{isSuccessModal ? "Success" : "Error"}</H1>
            </div>
            <H3>{text}</H3>
        </Modal>
    )
}
export default ErrorSuccessModal