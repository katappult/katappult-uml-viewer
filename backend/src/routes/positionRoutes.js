import express from 'express';
import {
    createPosition,
    getAllPositions,
    getPositionByName,
    updatePositionByName,
    deletePositionByName,
    deleteAllPositions
} from '../controllers/positionController.js';

const router = express.Router();

router.post('/', createPosition); 
router.get('/', getAllPositions); 
router.get('/:name', getPositionByName);
router.put('/:name', updatePositionByName)
router.delete('/:name', deletePositionByName);
router.delete('/', deleteAllPositions);

export default router;
