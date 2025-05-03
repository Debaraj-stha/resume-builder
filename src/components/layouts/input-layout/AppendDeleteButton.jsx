import { FiDelete } from "react-icons/fi"
import { Button } from "../../CustomComponents"
import { BiPlus } from "react-icons/bi"
import ToolTip from "../../Tooltip"

const AppendRemoveButton = ({ 
    handleRemove, handleAppend, 
    toolTipText = {
         appendField: "Append New Field", removeField: "Remove  New Field"
         } }) => {
    return (
        <div className={`flex  justify-end`}>
            <RemoveButton handleRemove={handleRemove} toolTipText={toolTipText.removeField} />
            <AppendButton handleAppend={handleAppend} toolTipText={toolTipText.appendField} />

        </div>
    )
}

export const AppendButton = ({ handleAppend, toolTipText }) => (
    <ToolTip text={toolTipText}>
        <Button type="button" onClick={handleAppend}>
            <BiPlus />
        </Button>
    </ToolTip>
)

export const RemoveButton = ({ handleRemove, toolTipText }) => (
    <ToolTip text={toolTipText}>
        <Button type="button" variant="danger" onClick={handleRemove}>
            <FiDelete />
        </Button>
    </ToolTip>
)
export default AppendRemoveButton