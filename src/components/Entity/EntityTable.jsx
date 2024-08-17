import PropTypes from 'prop-types'
import {Handle, Position} from '@xyflow/react'
import {camelToSnakeCase, typeMap} from '../../utils'
import {useHover} from '../../hooks/useHover'

export const EntityTable = ({data}) => {
    const {toggleHover} = useHover()
    if (!data?.attributes) {
        return <div>No data available</div>
    }

    return (
        <div
            className="text-updater-node"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="source" position={Position.Left} id="b" />
            <table className="minimalistBlack item">
                <thead className="custom-drag-handle">
                    <tr>
                        <th colSpan={2}>{data.table || 'Unknown Table'}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.attributes.map(attr => (
                        <tr
                            key={attr.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <td style={{textAlign: 'left'}}>
                                {camelToSnakeCase(attr.name)}
                            </td>
                            <td style={{textAlign: 'right'}}>
                                {typeMap[attr.type] || attr.type}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

EntityTable.propTypes = {
    data: PropTypes.object.isRequired,
}
