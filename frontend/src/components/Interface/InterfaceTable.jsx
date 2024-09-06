import PropTypes from 'prop-types'
import {Handle, Position} from '@xyflow/react'

export const InterfaceTable = ({data}) => {
    return (
        <div className="text-updater-node">
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="source" position={Position.Left} id="b" />
            <table className="minimalistBlack item">
                <thead className="custom-drag-handle">
                    <tr>
                        <th colSpan={2}>&lt;&lt;{data}&gt;&gt;</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

InterfaceTable.propTypes = {
    data: PropTypes.string.isRequired,
}
