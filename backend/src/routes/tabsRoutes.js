// routes/tabRoutes.js

import express from 'express';
import {
    createTab,
    getAllTabs,
    getTabById,
    getTabByName,
    updateTabById,
    deleteTabById,
} from '../controllers/tabsController.js';

const router = express.Router();

router.post('/tabs', createTab);
router.get('/tabs', getAllTabs);
router.get('/tabs/:id', getTabById);
router.get('/tabs/name/:name', getTabByName);
router.put('/tabs/:id', updateTabById);
router.delete('/tabs/:id', deleteTabById);

export default router;
