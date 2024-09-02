import { tabs } from "../data.js";

export const createTabs = (req, res) => {
  const { name, x, y, zoom } = req.body;
  if (!name || x === undefined || y === undefined || zoom === undefined) {
    return res.status(400).json({ error: "name, x, y and zoom are required" });
  }

  const newTabs = { name, x, y, zoom };
  tabs.push(newTabs);
  res.status(201).json(newTabs);
};

export const getAllTabs = (req, res) => {
  res.json(tabs);
};

export const getTabByName = (req, res) => {
  const { name } = req.params;
  const tab = tabs.find((tab) => tab.name === name);
  if (!tab) {
    return res.status(404).json({ error: "tab not found" });
  }
  res.json(tab);
};

export const updateTabByName = (req, res) => {
  const { name } = req.params;
  const { x, y, zoom } = req.body;
  const tab = tabs.find((tab) => tab.name === name);
  if (!tab) {
    return res.status(404).json({ error: "tab not found" });
  }
  if (x !== undefined) tab.x = x;
  if (y !== undefined) tab.y = y;
  if (zoom !== undefined) tab.zoom = zoom;
  res.json(tab);
};

export const deleteTabByName = (req, res) => {
  const { name } = req.params;
  const index = tabs.findIndex((tab) => tab.name === name);
  if (index === -1) {
    return res.status(404).json({ error: "tab not found" });
  }
  tabs.splice(index, 1);
  res.status(204).send();
};

export const deleteAllTab = (req, res) => {
  tabs.length = 0;
  res.status(204).send();
};
