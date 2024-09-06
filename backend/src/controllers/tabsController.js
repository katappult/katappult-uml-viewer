import { getTabs, setTabs, generateId } from '../models/Tab.js';

export const createTab = (req, res) => {
  const newTab = {
    id: generateId(),
    ...req.body,
  };
  const tabs = getTabs();
  tabs.push(newTab);
  setTabs(tabs);
  res.status(201).json(newTab);
};

export const getAllTabs = (req, res) => {
  res.status(200).json(getTabs());
};

export const getTabById = (req, res) => {
  const tabs = getTabs();
  const tab = tabs.find((t) => t.id === parseInt(req.params.id));
  if (!tab) return res.status(404).json({ error: 'Tab not found' });
  res.status(200).json(tab);
};

export const updateTabById = (req, res) => {
  const tabs = getTabs();
  const index = tabs.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tab not found' });

  tabs[index] = { ...tabs[index], ...req.body };
  setTabs(tabs);
  res.status(200).json(tabs[index]);
};

export const deleteTabById = (req, res) => {
  const tabs = getTabs();
  const index = tabs.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tab not found' });

  tabs.splice(index, 1);
  setTabs(tabs);
  res.status(200).json({ message: 'Tab deleted successfully' });
};
