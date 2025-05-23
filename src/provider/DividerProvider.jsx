import React, {
    createContext,
    useState,
    useCallback,
    useMemo,
    useContext
} from "react";

import {
    AngleGradientDivider,
    DashedLineDivider,
    DividerWithStarBorder,
    DottedLineDivider,
    DoubleLineDivider,
    LineDivider,
    LineWithDots,
    TransparentLine,
    TransparentLineWithAngleAtCenter,
    TransparentLineWithBox,
    TransparentLineWithSeperatorAtEnd,
    ZigzagDivider
} from "../components/Divider/TransparentDividers";

const DividerContext = createContext();

const DividerProvider = ({ children }) => {
    const dividers = useMemo(() => ({
        "transparent_line": <TransparentLine />,
        "line": <LineDivider />,
        "DividerWithStarBorder": <DividerWithStarBorder />,
        "AngleGradientDivider": <AngleGradientDivider />,
        "DashedLineDivider": <DashedLineDivider />,
        "DottedLineDivider": <DottedLineDivider />,
        "DoubleLineDivider": <DoubleLineDivider />,
        "ZigzagDivider": <ZigzagDivider />,
        "TransparentLineWithAngleAtCenter": <TransparentLineWithAngleAtCenter />,
        "TransparentLineWithSeperatorAtEnd": <TransparentLineWithSeperatorAtEnd />,
        "TransparentLineWithBox": <TransparentLineWithBox />,
        "LineWithDots": <LineWithDots />
    }), []);

    const [divider, setDivider] = useState(null);

    const changeDivider = useCallback((key) => {
        setDivider(dividers[key]);
    }, [dividers]);

    const value = useMemo(() => ({
        divider,
        dividers,
        changeDivider,
        setDivider,
    }), [divider, dividers, changeDivider, setDivider]);

    return (
        <DividerContext.Provider value={value}>
            {children}
        </DividerContext.Provider>
    );
};

export default DividerProvider;

export const useDivider = () => useContext(DividerContext);
