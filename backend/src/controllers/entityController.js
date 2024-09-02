// src/controllers/entityController.js
import { entities } from '../data.js';
import { v4 as uuidv4 } from 'uuid';

// Create (POST) - Add a new entity
export const createEntity = (req, res) => {
    const { name, data } = req.body;
    if (!name || data === undefined) {
        return res.status(400).json({ error: 'name and data are required' });
    }
    const newEntity = { id: uuidv4(), name, data };
    entities.push(newEntity);
    res.status(201).json(newEntity);
};

// Read (GET) - Get all entities
export const getAllEntities = (req, res) => {
    res.json(entities);
};

// Read (GET) - Get a specific entity by name
export const getEntityByName = (req, res) => {
    const { name } = req.params;
    const entity = entities.find(ent => ent.name === name);

    if (!entity) {
        return res.status(404).json({ error: 'Entity not found' });
    }

    res.json(entity);
};

// Update (PUT) - Update an entity by name
export const updateEntityByName = (req, res) => {
    const { name } = req.params;
    const { data } = req.body;
    const entity = entities.find(ent => ent.name === name);

    if (!entity) {
        return res.status(404).json({ error: 'Entity not found' });
    }

    if (data !== undefined) entity.data = data;

    res.json(entity);
};

// Delete (DELETE) - Remove an entity by name
export const deleteEntityByName = (req, res) => {
    const { name } = req.params;
    const index = entities.findIndex(ent => ent.name === name);

    if (index === -1) {
        return res.status(404).json({ error: 'Entity not found' });
    }

    entities.splice(index, 1);
    res.status(204).send();
};

// Delete all entities
export const deleteAllEntities = (req, res) => {
    entities = [];
    res.status(204).send();
};
