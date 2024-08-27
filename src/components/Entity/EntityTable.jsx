import PropTypes from 'prop-types'
import {Handle, Position} from '@xyflow/react'
import {camelToSnakeCase, typeMap} from '../../utils'
import {useHover} from '../../hooks/useHover'
import {Tr} from '../Tr'
import React from 'react'
import {
    LifeCycleManagedAttributes,
    TypeManagedAttributes,
    ThumbedAttributes,
    NumberableAttributes,
    IteratedAttributes,
    VersionedAttributes,
    ContentHolderAttributes,
    WorkableAttributes,
    ContactableAttributes,
} from '../knoers/KnoersAttributes'

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
                    <Tr attributes="OID" type="LONG" id />
                    {data.oneToMany && data.oneToMany.length > 0 && (
                        <>
                            {data.oneToMany.map(item => (
                                <Tr
                                    key={item.id}
                                    attributes={
                                        camelToSnakeCase(item.roleBClass) +
                                        '_OID'
                                    }
                                    type="LONG"
                                />
                            ))}
                        </>
                    )}
                    {data.entity.attributes.map(attr => (
                        <Tr
                            key={attr.id}
                            attributes={camelToSnakeCase(attr.name)}
                            type={typeMap[attr.type] || attr.type}
                        />
                    ))}
                    {Array.isArray(data.entity.knoers) &&
                        data.entity.knoers.map((knoer, index) => (
                            <React.Fragment key={knoer.id || knoer + index}>
                                {knoer === 'LifecycleManaged' && (
                                    <LifeCycleManagedAttributes model />
                                )}
                                {knoer === 'TypeManaged' && (
                                    <TypeManagedAttributes model />
                                )}
                                {knoer === 'Thumbed' && (
                                    <ThumbedAttributes model />
                                )}
                                {knoer === 'Numberable' && (
                                    <NumberableAttributes model />
                                )}
                                {knoer === 'Iterated' && (
                                    <IteratedAttributes model />
                                )}
                                {knoer === 'Versioned' && (
                                    <VersionedAttributes model />
                                )}
                                {knoer === 'ContentHolder' && (
                                    <ContentHolderAttributes model />
                                )}
                                {knoer === 'Workable' && (
                                    <WorkableAttributes model />
                                )}
                                {knoer === 'Contactable' && (
                                    <ContactableAttributes model />
                                )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

EntityTable.propTypes = {
    data: PropTypes.object.isRequired,
}
