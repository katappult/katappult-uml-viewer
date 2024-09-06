import express from 'express';
import {
  createTab,
  getAllTabs,
  getTabById,
  updateTabById,
  deleteTabById,
} from '../controllers/tabsController.js';

const router = express.Router();

router.post('/tabs', createTab);
router.get('/tabs', getAllTabs);
router.get('/tabs/:id', getTabById);
router.put('/tabs/:id', updateTabById);
router.delete('/tabs/:id', deleteTabById);

export default router;
