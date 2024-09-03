// controllers/tabController.js

import { getTabs, setTabs, generateId,findTabByName  } from '../models/Tab.js';

// Create a new tab
export const createTab = (req, res) => {
  const { name } = req.body;

  // Check if name is unique
  if (findTabByName(name)) {
      return res.status(400).json({ error: "Tab name must be unique" });
  }

  const newTab = {
      id: generateId(),
      ...req.body,
  };
  const tabs = getTabs();
  tabs.push(newTab);
  setTabs(tabs);
  res.status(201).json(newTab);
};

// Lire tous les onglets
export const getAllTabs = (req, res) => {
    res.status(200).json(getTabs());
};

// Lire un onglet par ID
export const getTabById = (req, res) => {
    const tabs = getTabs();
    const tab = tabs.find(t => t.id === parseInt(req.params.id));
    if (!tab) return res.status(404).json({ error: "Tab not found" });
    res.status(200).json(tab);
};

// Get tab by name
export const getTabByName = (req, res) => {
  const tab = findTabByName(req.params.name);
  if (!tab) return res.status(404).json({ error: "Tab not found" });
  res.status(200).json(tab);
};

// Mettre à jour un onglet par ID
export const updateTabById = (req, res) => {
    const tabs = getTabs();
    const index = tabs.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Tab not found" });

    tabs[index] = { ...tabs[index], ...req.body };
    setTabs(tabs);
    res.status(200).json(tabs[index]);
};

// Supprimer un onglet par ID
export const deleteTabById = (req, res) => {
    const tabs = getTabs();
    const index = tabs.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Tab not found" });

    tabs.splice(index, 1);
    setTabs(tabs);
    res.status(200).json({ message: "Tab deleted successfully" });
};
