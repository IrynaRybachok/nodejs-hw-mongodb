import express from 'express';
import contactRoutes from './contacts.js';
import authRoutes from './auth.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', authenticate, contactRoutes);

export default router;
