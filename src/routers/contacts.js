import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrraper.js';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts';

const router = express.Router();
router.get('/', ctrlWrapper(getAllContactsController)); // /api/contacts/
router.get('/:contactId', ctrlWrapper(getContactByIdController)); // /api/contacts/:contactId

export default router;
