import {useState} from 'react'
import {Tabs} from './Tabs'

export const TabParent = () => {
    const [tabs, setTabs] = useState([
        {id: 1, title: 'Tab 1', component: <Tabs />},
    ])
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [editingTab, setEditingTab] = useState(null)

    const addTab = () => {
        if (tabs.length >= 5) {
            alert('You can only have 5 tabs.')
            return
        }

        const newTabId = tabs.length + 1
        const newTab = {
            id: newTabId,
            title: `Tab ${newTabId}`,
            component: <Tabs />,
        }
        setTabs([...tabs, newTab])
        setActiveTab(newTabId)
    }

    const deleteTab = id => {
        const filteredTabs = tabs.filter(tab => tab.id !== id)
        setTabs(filteredTabs)
        if (activeTab === id && filteredTabs.length > 0) {
            setActiveTab(filteredTabs[0].id)
        }
    }

    const handleTitleChange = (e, id) => {
        const updatedTabs = tabs.map(tab =>
            tab.id === id ? {...tab, title: e.target.value} : tab
        )
        setTabs(updatedTabs)
    }

    const saveTitle = () => {
        setEditingTab(null)
    }
    return (
        <div>
            <div className="tabs">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {editingTab === tab.id ? (
                            <input
                                type="text"
                                value={tab.title}
                                onChange={e => handleTitleChange(e, tab.id)}
                                onBlur={saveTitle}
                                autoFocus
                            />
                        ) : (
                            <span
                                onClick={e => {
                                    e.stopPropagation()
                                    setEditingTab(tab.id)
                                }}
                            >
                                {tab.title}
                            </span>
                        )}
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                deleteTab(tab.id)
                            }}
                            style={{marginLeft: 10, cursor: 'pointer'}}
                        >
                            x
                        </span>
                    </div>
                ))}
                <button onClick={addTab}>+</button>
            </div>

            <div className="content">
                {tabs.map(
                    tab =>
                        activeTab === tab.id && (
                            <div key={tab.id}>{tab.component}</div>
                        )
                )}
            </div>
        </div>
    )
}
