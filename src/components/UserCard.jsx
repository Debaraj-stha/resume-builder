import React, { useEffect, useState } from "react";


import { MdArrowDropDown } from "react-icons/md";
import Modal from "./Modal";
import ToolTip from "./Tooltip";
import { useTheme } from "styled-components";
import { Button } from "./CustomComponents";
import { useAuth } from "../provider/AuthProvider";
import LoginButton from "./LoginButton";
import profile_holder from "../assets/profile_holder.jpg"

const Usercard = () => {
    const { user, logout,loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme=useTheme()

    const handleLogout = () => {
        setIsModalOpen(true); // Trigger modal open
    };
    

    return (
        <div className="user-card flex items-center gap-4 p-4 rounded-lg">
            {user ? (
                <>
                    <div className="profile">
                        <img
                            src={user?.picture || profile_holder}
                            alt="User Profile"
                            className="w-16 h-16 rounded-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold sm:text-lg sm:font-medium" style={{color:theme.colors.text}}>
                            {user.name}
                        </h3>
                        <ToolTip text="Logout">
                        <Button variant="danger"
                            onClick={handleLogout}
                            
                        >
                            Logout
                        </Button>
                        </ToolTip>
                    </div>
                    

                    {/* ✅ Render modal when modal state is true */}
                    {isModalOpen && (
                        <Modal
                            onClose={() => setIsModalOpen(false)}
                            header={<h2 className='text-green-500 text-2xl font-bold text-center'>Confirm Logout</h2>}
                            footer={
                                <div className="flex justify-end gap-4">
                                    <Button variant="ghost"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 rounded text-black"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                    variant="danger"
                                        onClick={() => {
                                            logout();
                                            setIsModalOpen(false);
                                        }}
                                        
                                        >
                                        Logout
                                    </Button>
                                </div>
                            }
                        >
                            <p className=' text-md' style={{color:theme.colors.text}}>Are you sure you want to logout?</p>
                        </Modal>
                    )}
                </>
            ) : (
                <LoginButton />
            )}
        </div>
    );
};

const UserCard = () => {
    const [isShown, setIsShown] = useState(false);

    const toggleUser = () => {
        setIsShown((prev) => !prev);

    };

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth >= 640) {
                setIsShown(false)
            }
        }
        window.addEventListener("resize",handleWindowResize)
        return ()=>window.removeEventListener("resize",handleWindowResize)
    },[])

    return (
        <>
            {/* toggle button to show and hide on small device */}
            <button
                className="sm:hidden cursor-pointer z-50 relative"
                onClick={toggleUser}
            >
                <MdArrowDropDown size={30} />
            </button>

            {/* Floating user card */}
            <div
                className={`fixed top-16 right-4 z-40 transition-all duration-300 ${isShown
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none -translate-y-2"
                    }`}
            >
                <div className="bg-white rounded-lg shadow-lg p-4 w-72">
                    <Usercard />
                </div>
            </div>

            {/* Full view on larger screens */}
            <div className="hidden sm:block">
                <Usercard />
            </div>
        </>
    );
};

export default UserCard;
