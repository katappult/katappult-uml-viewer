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
} from '../knoers/KnoersAttributes'
import {Tr} from '../Tr'

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
                        <Tr
                            key={attr.id}
                            attributes={attr.name}
                            type={attr.type}
                        />
                    ))}
                    {Array.isArray(data.entity.knoers) &&
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

ObjectTable.propTypes = {
    data: PropTypes.object.isRequired,
}
