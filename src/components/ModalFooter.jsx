import { memo } from "react"
import { Button } from "./CustomComponents"

const ModalFooter = memo(({ onOk, onClose, shouldShowcancel = true }) => {
    return (
        <div className="flex justify-between">
            {
                shouldShowcancel ? 
                <Button variant="danger" onClick={onClose}>
                    Ok
                </Button> : <>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onOk}>
                        Ok
                    </Button>
                </>
            }

        </div>
    )
})
export default ModalFooter