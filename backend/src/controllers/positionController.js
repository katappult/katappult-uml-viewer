import { positions } from "../data.js";

export const createPosition = (req, res) => {
  const { name, x, y } = req.body;
  if (!name || x === undefined || y === undefined) {
    return res.status(400).json({ error: "name, x, and y are required" });
  }
  const newPosition = { name, x, y };
  positions.push(newPosition);
  res.status(201).json(newPosition);
};

export const getAllPositions = (req, res) => {
  res.json(positions);
};

export const getPositionByName = (req, res) => {
  const { name } = req.params;
  const position = positions.find((pos) => pos.name === name);
  if (!position) {
    return res.status(404).json({ error: "Position not found" });
  }
  res.json(position);
};

export const updatePositionByName = (req, res) => {
  const { name } = req.params;
  const { x, y } = req.body;
  const position = positions.find((pos) => pos.name === name);
  if (!position) {
    return res.status(404).json({ error: "Position not found" });
  }
  if (x !== undefined) position.x = x;
  if (y !== undefined) position.y = y;
  res.json(position);
};

export const deletePositionByName = (req, res) => {
  const { name } = req.params;
  const index = positions.findIndex((pos) => pos.name === name);
  if (index === -1) {
    return res.status(404).json({ error: "Position not found" });
  }
  positions.splice(index, 1);
  res.status(204).send();
};

export const deleteAllPositions = (req, res) => {
  positions.length = 0;
  res.status(204).send();
};
