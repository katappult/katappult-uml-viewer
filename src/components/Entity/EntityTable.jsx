import PropTypes from 'prop-types'
import {Handle, Position} from '@xyflow/react'
import {camelToSnakeCase, typeMap} from '../../utils'
import {useHover} from '../../hooks/useHover'

export const EntityTable = ({data}) => {
    const {toggleHover} = useHover()
    if (!data?.entity.attributes) {
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
                        <th colSpan={2}>
                            {data.entity.table || 'Unknown Table'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <td
                            style={{
                                textAlign: 'left',
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                            }}
                        >
                            OID
                        </td>
                        <td style={{textAlign: 'right'}}>LONG</td>
                    </tr>
                    {data.oneToMany && data.oneToMany.length > 0 && (
                        <>
                            {data.oneToMany.map(item => (
                                <tr
                                    key={item.id} // Ensure each item has a unique key
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <td
                                        style={{
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {camelToSnakeCase(item.roleBClass) + "_OID"}
                                    </td>
                                    <td style={{textAlign: 'right'}}>LONG</td>
                                </tr>
                            ))}
                        </>
                    )}
                    {data.entity.attributes.map(attr => (
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
