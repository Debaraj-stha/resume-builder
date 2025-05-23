import { memo } from "react";
import { CgClose } from "react-icons/cg";
import { CloseButton } from "./CustomComponents";
import { LineDivider } from "./Divider/TransparentDividers";

const BigModal = memo(({ children, onClose, header, footer }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[90vh] flex flex-col">
                {/* Header (static) */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{header}</h2>
                    <CloseButton onClick={onClose}>
                        <CgClose />
                    </CloseButton>
                </div>
                <LineDivider/>
                {/* Scrollable content */}
                <div className="overflow-y-auto mb-4" style={{ maxHeight: "65vh" }}>
                    {children}

                </div>
                {footer && <div className="mt-4">{footer}</div>}
            </div>
        </div>
    );
});

export default BigModal;
