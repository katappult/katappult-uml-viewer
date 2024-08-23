import PropTypes from 'prop-types'
import {Handle, Position} from '@xyflow/react'

export const ObjectTable = ({data}) => {
    if (!data?.entity.attributes) {
        return <div>No data available</div>
    }

    return (
        <div className="text-updater-node">
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="source" position={Position.Left} id="b" />
            <table className="minimalistBlack item">
                <thead className="custom-drag-handle">
                    <tr>
                        <th colSpan={2}>
                            {data.entity.name || 'Unknown Table'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.entity.attributes.map(attr => (
                        <tr
                            key={attr.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <td style={{textAlign: 'left'}}>{attr.name}</td>
                            <td style={{textAlign: 'right'}}>{attr.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

ObjectTable.propTypes = {
    data: PropTypes.object.isRequired,
}
