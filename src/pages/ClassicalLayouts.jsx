import React from "react";
import ClassicalLayout3 from "../components/layouts/classic/ClassicalLayout3";
import { Hspace } from "../components/CustomComponents";
import Container from "../components/Container";
const ClassicalLayouts = () => {
    return (
        <Container>
            <div className="m-auto">
                <Hspace />
                <ClassicalLayout3></ClassicalLayout3>
            </div>
        </Container>

    )
}
export default ClassicalLayouts