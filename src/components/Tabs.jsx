import {useState} from 'react'
import {EntityDiagram} from '../components/Entity/EntityDiagram'
import {ObjectDiagram} from '../components/Object/ObjectDiagram'
import {ReactFlowProvider} from '@xyflow/react'
export const Tabs = () => {
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
                        <EntityDiagram />
                    </ReactFlowProvider>
                )}
                {activeTab === 'object' && (
                    <ReactFlowProvider>
                        <ObjectDiagram />
                    </ReactFlowProvider>
                )}
            </div>
        </div>
    )
}
