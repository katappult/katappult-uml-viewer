// models/Tab.js

let tabs = [];

// Pour simuler un auto-increment ID
let currentId = 1;

// Exporter les données et la fonction
export const generateId = () => currentId++;
export const getTabs = () => tabs;
export const setTabs = (newTabs) => {
    tabs = newTabs;
};

// Find tab by name
export const findTabByName = (name) => {
    return tabs.find(tab => tab.name === name);
};