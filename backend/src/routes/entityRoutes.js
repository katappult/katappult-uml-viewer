import express from 'express';

import {
    createEntity,
    getAllEntities,
    getEntityByName,
    updateEntityByName,
    deleteEntityByName,
    deleteAllEntities
} from '../controllers/entityController.js';

const router = express.Router();

router.post('/entities', createEntity);
router.get('/entities', getAllEntities);
router.get('/entities/:name', getEntityByName);
router.put('/entities/:name', updateEntityByName);
router.delete('/entities/:name', deleteEntityByName);
router.delete('/entities', deleteAllEntities);

export default router;