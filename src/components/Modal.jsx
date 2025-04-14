import React from "react";
import { CgClose } from "react-icons/cg";

const Modal = ({ children, onClose, header, footer }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
        {/* Header */}
        <div className="mb-4 flex justify-between items-center border-b pb-2">
          <div className="text-lg font-semibold">{header}</div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl transition-all"
          >
            <CgClose />
          </button>
        </div>

        {/* Body */}
        <div className="mb-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="pt-3 mt-3 border-t">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
