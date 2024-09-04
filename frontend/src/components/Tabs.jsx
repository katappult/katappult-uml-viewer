import {useState} from 'react'
import {EntityDiagram} from '../components/Entity/EntityDiagram'
import {ObjectDiagram} from '../components/Object/ObjectDiagram'
import {ReactFlowProvider} from '@xyflow/react'
import PropTypes from 'prop-types'

export const Tabs = ({id}) => {
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
                        <EntityDiagram id={id} />
                    </ReactFlowProvider>
                )}
                {activeTab === 'object' && (
                    <ReactFlowProvider>
                        <ObjectDiagram id={id} />
                    </ReactFlowProvider>
                )}
            </div>
        </div>
    )
}
Tabs.propTypes = {
    id: PropTypes.number.isRequired,
}
