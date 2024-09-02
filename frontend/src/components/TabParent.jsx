import {useState} from 'react'
import {Tabs} from './Tabs'

export const TabParent = () => {
    const [tabs, setTabs] = useState([
        {id: 1, title: 'Tab 1', component: <Tabs id={1}/>},
    ])
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [editingTab, setEditingTab] = useState(null)
    const [nextTabId, setNextTabId] = useState(2) // Tracks the next ID to be assigned

    // Add a new tab with a limit of 5 tabs
    const addTab = () => {
        if (tabs.length >= 5) {
            alert('You can only have 5 tabs.')
            return
        }

        const newTab = {
            id: nextTabId,
            title: `Tab ${nextTabId}`,
            component: <Tabs id={nextTabId}/>,
        }
        setTabs([...tabs, newTab])
        setActiveTab(newTab.id) // Set the new tab as active
        setNextTabId(nextTabId + 1) // Increment the ID for the next tab
    }

    // Delete a tab with a restriction to keep at least one tab
    const deleteTab = id => {
        if (tabs.length === 1) {
            alert('You cannot delete the last remaining tab.')
            return
        }

        const filteredTabs = tabs.filter(tab => tab.id !== id)
        setTabs(filteredTabs)

        // If the active tab is deleted, set the active tab to the first one
        if (activeTab === id && filteredTabs.length > 0) {
            setActiveTab(filteredTabs[0].id)
        }
    }

    // Handle title change
    const handleTitleChange = (e, id) => {
        const updatedTabs = tabs.map(tab =>
            tab.id === id ? {...tab, title: e.target.value} : tab
        )
        setTabs(updatedTabs)
    }

    // Save the title
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
                                onDoubleClick={e => {
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
