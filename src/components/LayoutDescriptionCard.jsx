import React, { memo } from "react";

import { H3, P } from "./elements/resumeSectionWrapper";
import { BorderBox, FlexBox } from "./CustomComponents";
import AnimateNumber from "./NumberAnimation";

const LayoutDescriptionCard = memo(({ title, description, includeUserCount, userCount }) => {
    return (
        <div className="about-layout px-2 sm:px-12 py-2 ">
            {title && <H3 textAlign="left">{title}</H3>}
            {description && <P>{description}</P>}
            {includeUserCount && (
                <BorderBox borderColor="#333" borderRadius="5px" margin="10px 0">
                    <FlexBox margin="0" alignItems="center" justifyContent="center">
                        <H3 color="black">Users who have used this layout</H3>
                        <AnimateNumber target={userCount} />
                    </FlexBox>
                </BorderBox>
            )}
        </div>
    );
});



export default LayoutDescriptionCard;
