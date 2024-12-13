import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrraper.js';
import {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { contactSchema, replaceContactSchema } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateaBody.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllContactsController)); // /contacts/
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController)); // /contacts/:contactId
router.post(
  '/',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(replaceContactSchema),
  ctrlWrapper(updateContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
export default router;
