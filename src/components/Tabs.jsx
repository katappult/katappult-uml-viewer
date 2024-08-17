import {useState} from 'react'
import {EntityDiagram} from '../components/Entity/EntityDiagram'
import {ObjectDiagram} from '../components/Object/ObjectDiagram'
export const Tabs = () => {
    const [activeTab, setActiveTab] = useState('object')

    return (
        <div>
            <div>
                <button onClick={() => setActiveTab('entity')}>
                    Entity Diagram
                </button>
                <button onClick={() => setActiveTab('object')}>
                    Object Diagram
                </button>
            </div>
            <div>
                {activeTab === 'entity' && <EntityDiagram />}
                {activeTab === 'object' && <ObjectDiagram />}
            </div>
        </div>
    )
}
