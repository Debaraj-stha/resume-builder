// DeleteModal.js
import React from "react";
import Modal from "../components/Modal";
import {  H1, H2, H3 } from "../components/CustomComponents";
import RoundedIcon from "../components/RoundedIcon";
import { useDashboard } from "../provider/DashboardProvider";
import ModalFooter from "./ModalFooter";
import { FaDeleteLeft } from "react-icons/fa6";

const DeleteModal = () => {
    const { theme, handleDelete, closeModal } = useDashboard()
    return (
        <Modal
            footer={
                <ModalFooter onOk={handleDelete} onClose={closeModal} />
            }
            onClose={closeModal}
        >
            <div className="flex items-center justify-center my-3 gap-4">
                <RoundedIcon background="green">
                    <FaDeleteLeft
                        color={theme.colors.icons?.default?.colors || "#fff"}
                        size={60}
                    />
                </RoundedIcon>
                <H1>Confirm</H1>
            </div>
            <H2>Are you sure you want to delete this resume?</H2>
            <H3 fontSize="16px" fontWeight="500">This action cannot be undone.</H3>
        </Modal>
    )
}



export default DeleteModal;
