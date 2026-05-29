import express from 'express';
import {
    createJournalist,
    deleteJournalist,
    getJournalistById,
    getJournalists,
    updateJournalist
} from '../controllers/journalistsControllers.js';

const router = express.Router();

router.get('/', getJournalists);
router.get('/:id', getJournalistById);
router.post('/', createJournalist);
router.put('/:id', updateJournalist);
router.delete('/:id', deleteJournalist);

export default router;
