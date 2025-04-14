import React, { useEffect, useState } from "react";
import { useUser } from "../provider/userProvider";
import Login from "./Login";
import { MdArrowDropDown } from "react-icons/md";
import Modal from "./Modal";

const Usercard = () => {
    const { user, logout } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        setIsModalOpen(true); // Trigger modal open
    };

    return (
        <div className="user-card flex items-center gap-4 p-4 rounded-lg">
            {user ? (
                <>
                    <div className="profile">
                        <img
                            src={user?.picture || "/assets/profile-holder.jpg"}
                            alt="User Profile"
                            className="w-16 h-16 rounded-full"
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold sm:text-lg sm:font-medium text-white">
                            {user.name}
                        </h3>
                        <button
                            onClick={handleLogout}
                            className="text-sm md:text-md mt-2 px-2 py-1 sm:px-4 sm:py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
                        >
                            Logout
                        </button>
                    </div>

                    {/* ✅ Render modal when modal state is true */}
                    {isModalOpen && (
                        <Modal
                            onClose={() => setIsModalOpen(false)}
                            header={<h2 className='text-green-500 text-2xl font-bold text-center'>Confirm Logout</h2>}
                            footer={
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 rounded text-black"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsModalOpen(false);
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded"
                                    >
                                        Logout
                                    </button>
                                </div>
                            }
                        >
                            <p className='text-black text-md'>Are you sure you want to logout?</p>
                        </Modal>
                    )}
                </>
            ) : (
                <Login />
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
