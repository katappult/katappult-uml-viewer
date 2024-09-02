import { viewports } from "../data.js";

export const createViewPort = (req, res) => {
  const { name, x, y, zoom } = req.body;
  if (!name || x === undefined || y === undefined || zoom === undefined) {
    return res.status(400).json({ error: "name, x, y and zoom are required" });
  }

  const existingViewPort = viewports.find((viewPort) => viewPort.name === name);
  if (existingViewPort) {
    return res
      .status(409)
      .json({ error: "Viewport with this name already exists" });
  }

  const newViewPort = { name, x, y, zoom };
  viewports.push(newViewPort);
  res.status(201).json(newViewPort);
};

export const getAllViewPort = (req, res) => {
  res.json(viewports);
};

export const getViewPortByName = (req, res) => {
  const { name } = req.params;
  const viewport = viewports.find((viewPort) => viewPort.name === name);
  if (!viewport) {
    return res.status(404).json({ error: "ViewPort not found" });
  }
  res.json(viewport);
};

export const updateViewPortByName = (req, res) => {
  const { name } = req.params;
  const { x, y, zoom } = req.body;
  const viewport = viewports.find((viewPort) => viewPort.name === name);
  if (!viewport) {
    return res.status(404).json({ error: "Viewport not found" });
  }
  if (x !== undefined) viewport.x = x;
  if (y !== undefined) viewport.y = y;
  if (zoom !== undefined) viewport.zoom = zoom;
  res.json(viewport);
};

export const deleteViewPortByName = (req, res) => {
  const { name } = req.params;
  const index = viewports.findIndex((viewPort) => viewPort.name === name);
  if (index === -1) {
    return res.status(404).json({ error: "ViewPort not found" });
  }
  viewports.splice(index, 1);
  res.status(204).send();
};

export const deleteAllViewPort = (req, res) => {
  viewports.length = 0;
  res.status(204).send();
};
