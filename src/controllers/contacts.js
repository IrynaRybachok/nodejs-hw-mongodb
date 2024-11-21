import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export async function getAllContactsController(req, res) {
  const contacts = await getAllContacts();

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;

  const contacts = await getContactById(contactId);

  if (contacts === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contacts,
  });
}
