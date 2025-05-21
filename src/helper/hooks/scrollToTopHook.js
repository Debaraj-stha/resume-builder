import { useEffect } from "react";

const useHomeHook = () => {
    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const handleScroll = () => {
            sections.forEach((section) => {
                const boundingRect = section.getBoundingClientRect().top;
                if (boundingRect < window.innerHeight - 100) {
                    section.classList.add("animate");
                }
            });
        };
        handleScroll(); // run once on mount
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

}

export default useHomeHook;