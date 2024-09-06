import {useState} from 'react'
import {EntityDiagram} from '../components/Entity/EntityDiagram'
import {ObjectDiagram} from '../components/Object/ObjectDiagram'

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
                {activeTab === 'entity' && <EntityDiagram id={id} />}
                {activeTab === 'object' && <ObjectDiagram id={id} />}
            </div>
        </div>
    )
}
Tabs.propTypes = {
    id: PropTypes.number.isRequired,
}
