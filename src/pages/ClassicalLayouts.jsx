import React from "react";
import ClassicalLayout1 from "../components/layouts/classic/layout-1/layout"
import ClassicalLayout2 from "../components/layouts/classic/layout-2/layout"
import { Hspace } from "../components/CustomComponents";
import Container from "../components/Container";
const ClassicalLayouts = () => {
    return (
        <Container>
            <div className="m-auto">
                <Hspace />
                <ClassicalLayout1/>
            </div>
        </Container>

    )
}
export default ClassicalLayouts