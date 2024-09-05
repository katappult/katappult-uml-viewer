import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs } from './Tabs';

export const TabParent = () => {
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [editingTab, setEditingTab] = useState(null);

    // Fetch tabs from the API when the component mounts
    useEffect(() => {
        const fetchTabs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API}/tabs`);
                const fetchedTabs = response.data;
                setTabs(fetchedTabs);
                if (fetchedTabs.length > 0) {
                    setActiveTab(fetchedTabs[0].id);
                }
            } catch (error) {
                console.error('Error fetching tabs:', error);
            }
        };

        fetchTabs();
    }, []);

    // Add a new tab with a limit of 5 tabs
    const addTab = async () => {
        if (tabs.length >= 5) {
            alert('You can only have 5 tabs.');
            return;
        }

        const newTab = {
            name: `Tab ${tabs.length + 1}`,
            selectedItems: [],
            viewportObject: { x: 0, y: 0, zoom: 1 },
            viewportEntity: { x: 0, y: 0, zoom: 1 },
            NodesObject: [],
            NodesEntity: [],
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/tabs`, newTab);
            const createdTab = response.data;
            setTabs([...tabs, createdTab]);
            setActiveTab(createdTab.id); // Set the new tab as active
        } catch (error) {
            console.error('Error creating tab:', error);
        }
    };

    // Delete a tab with a restriction to keep at least one tab
    const deleteTab = async (id) => {
        if (tabs.length === 1) {
            alert('You cannot delete the last remaining tab.');
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_API}/tabs/${id}`);
            const filteredTabs = tabs.filter((tab) => tab.id !== id);
            setTabs(filteredTabs);

            if (activeTab === id && filteredTabs.length > 0) {
                setActiveTab(filteredTabs[0].id);
            }
        } catch (error) {
            console.error('Error deleting tab:', error);
        }
    };

    // Handle title change
    const handleTitleChange = (e, id) => {
        const updatedTabs = tabs.map((tab) =>
            tab.id === id ? { ...tab, name: e.target.value } : tab
        );
        setTabs(updatedTabs);
    };

    // Save the title
    const saveTitle = async (id) => {
        const tabToUpdate = tabs.find((tab) => tab.id === id);
        if (tabToUpdate) {
            try {
                await axios.put(`${import.meta.env.VITE_API}/tabs/${id}`, tabToUpdate);
                setEditingTab(null);
            } catch (error) {
                console.error('Error updating tab:', error);
            }
        }
    };

    return (
        <div>
            <div className="tabs">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {editingTab === tab.id ? (
                            <input
                                type="text"
                                value={tab.name}
                                onChange={(e) => handleTitleChange(e, tab.id)}
                                onBlur={() => saveTitle(tab.id)}
                                autoFocus
                            />
                        ) : (
                            <span
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    setEditingTab(tab.id);
                                }}
                            >
                                {tab.name}
                            </span>
                        )}
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteTab(tab.id);
                            }}
                            style={{ marginLeft: 10, cursor: 'pointer' }}
                        >
                            x
                        </span>
                    </div>
                ))}
                <button onClick={addTab}>+</button>
            </div>

            <div className="content">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.id && (
                            <div key={tab.id}>
                                <Tabs id={tab.id} />
                            </div>
                        )
                )}
            </div>
        </div>
    );
};
