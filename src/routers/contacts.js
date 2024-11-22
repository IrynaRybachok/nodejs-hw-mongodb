import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrraper.js';
import {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllContactsController)); // /api/contacts/
router.get('/:contactId', ctrlWrapper(getContactByIdController)); // /api/contacts/:contactId
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.patch('/:contactId', jsonParser, ctrlWrapper(updateContactController));
router.delete('/:ontactId', ctrlWrapper(deleteContactController));
export default router;
