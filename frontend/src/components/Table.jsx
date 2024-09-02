import PropTypes from 'prop-types'
import {Handle, Position} from '@xyflow/react'
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
} from '../components/knoers/KnoersAttributes'
import {Tr} from '../components/Tr'

import {camelToSnakeCase, typeMap} from '../utils'
import {useHover} from '../hooks/useHover'
import {useCheckedId} from '../hooks/useCheckedId'
import {useCheckedForeignKey} from '../hooks/useCheckedForeignKey'
import {useCheckedAttribute} from '../hooks/useCheckedAttribute'
import {useCheckedInterface} from '../hooks/useCheckedInterface'
export const Table = ({data, isEntity}) => {
    const {toggleHover} = useHover()
    const {isCheckedId} = useCheckedId()
    const {isCheckedForeignKey} = useCheckedForeignKey()
    const {isCheckedAttribute} = useCheckedAttribute()
    const {isCheckedInterface} = useCheckedInterface()

    if (!data?.entity.attributes) {
        return <div>No data available</div>
    }

    return (
        <div
            className="text-updater-node"
            onMouseEnter={isEntity ? toggleHover : undefined}
            onMouseLeave={isEntity ? toggleHover : undefined}
        >
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="source" position={Position.Left} id="b" />
            <table className="minimalistBlack item">
                <thead className="custom-drag-handle">
                    <tr>
                        <th colSpan={2}>
                            {isEntity
                                ? data.entity.table
                                : data.entity.name || 'Unknown Table'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isEntity && isCheckedId && (
                        <Tr attributes="OID" type="LONG" id />
                    )}

                    {isCheckedForeignKey &&
                        data.oneToMany &&
                        data.oneToMany.length > 0 && (
                            <>
                                {data.oneToMany.map(item => (
                                    <Tr
                                        key={item.id}
                                        attributes={
                                            isEntity
                                                ? camelToSnakeCase(
                                                      item.roleBClass
                                                  ) + '_OID'
                                                : item.roleBClass
                                        }
                                        type={
                                            isEntity ? 'LONG' : item.roleBClass
                                        }
                                    />
                                ))}
                            </>
                        )}

                    {isCheckedAttribute &&
                        data.entity.attributes.map(attr => (
                            <Tr
                                key={attr.id}
                                attributes={
                                    isEntity
                                        ? camelToSnakeCase(attr.name)
                                        : attr.name
                                }
                                type={isEntity ? typeMap[attr.type] : attr.type}
                            />
                        ))}

                    {isCheckedInterface &&
                        Array.isArray(data.entity.knoers) &&
                        data.entity.knoers.map((knoer, index) => (
                            <React.Fragment key={knoer.id || knoer + index}>
                                {knoer === 'LifecycleManaged' && (
                                    <LifeCycleManagedAttributes />
                                )}
                                {knoer === 'TypeManaged' && (
                                    <TypeManagedAttributes />
                                )}
                                {knoer === 'Thumbed' && <ThumbedAttributes />}
                                {knoer === 'Numberable' && (
                                    <NumberableAttributes />
                                )}
                                {knoer === 'Iterated' && <IteratedAttributes />}
                                {knoer === 'Versioned' && (
                                    <VersionedAttributes />
                                )}
                                {knoer === 'ContentHolder' && (
                                    <ContentHolderAttributes />
                                )}
                                {knoer === 'Workable' && <WorkableAttributes />}
                                {knoer === 'Contactable' && (
                                    <ContactableAttributes />
                                )}
                            </React.Fragment>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    data: PropTypes.object.isRequired,
    isEntity: PropTypes.bool,
}
