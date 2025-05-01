import React, { useEffect } from "react";
import { Hspace } from "../components/CustomComponents";

import AllLayouts from "./AllTemplates";

import Container from "../components/Container";


const Templates = () => {
    useEffect(() => {
        const gridItems = document.querySelectorAll(".templates")
        const handleScroll = () => {
            gridItems.forEach((item) => {
                const boundingRect = item.getBoundingClientRect().top;
                if (boundingRect < window.innerHeight - 100) {
                    item.classList.add("animate");
                }
            });
        };

        handleScroll(); // run once on mount
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <Container>

            <Hspace></Hspace>
            <div className="items-center max-w-7xl mx-auto px-4">
                <AllLayouts />
            </div>
        </Container>
    )
}
export default Templates