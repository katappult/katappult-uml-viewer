import {useState} from 'react'
import {EntityDiagram} from '../components/Entity/EntityDiagram'
import {ObjectDiagram} from '../components/Object/ObjectDiagram'
import {ReactFlowProvider} from '@xyflow/react'
import PropTypes from 'prop-types'

export const Tabs = ({id, nodes, edges, selectedItems, viewport}) => {
    const [activeTab, setActiveTab] = useState('object')

    return (
        <div>
            <div className="tab-buttons">
                <button
                    className={activeTab === 'entity' ? 'active' : ''}
                    onClick={() => setActiveTab('entity')}
                >
                    Entity Diagram
                </button>
                <button
                    className={activeTab === 'object' ? 'active' : ''}
                    onClick={() => setActiveTab('object')}
                >
                    Object Diagram
                </button>
            </div>
            <div>
                {activeTab === 'entity' && (
                    <ReactFlowProvider>
                        <EntityDiagram
                            id={id}
                            nodes={nodes}
                            edges={edges}
                            selectedItems={selectedItems}
                            viewport={viewport}
                        />
                    </ReactFlowProvider>
                )}
                {activeTab === 'object' && (
                    <ReactFlowProvider>
                        <ObjectDiagram
                            id={id}
                            nodes={nodes}
                            edges={edges}
                            selectedItems={selectedItems}
                            viewport={viewport}
                        />
                    </ReactFlowProvider>
                )}
            </div>
        </div>
    )
}

Tabs.propTypes = {
    id: PropTypes.number.isRequired,
    nodes: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    viewport: PropTypes.object.isRequired,
}
