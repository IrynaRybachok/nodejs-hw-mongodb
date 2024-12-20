import createHttpError from 'http-errors';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import * as fs from 'node:fs/promises';
import path from 'node:path';

export async function getAllContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  if (contacts === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  let photo = null;

  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const savePhotoCloudinary = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      photo = savePhotoCloudinary.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'photos', req.file.filename),
      );
    }
    photo = `http://localhost:3030/photos/${req.file.filename}`;
  }
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo,
  };

  const result = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function updateContactController(req, res) {
  let photo = null;

  if (typeof req.file !== 'undefined') {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      const savePhotoCloudinary = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      photo = savePhotoCloudinary.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public', 'photos', req.file.filename),
      );
    }
    photo = `http://localhost:3030/photos/${req.file.filename}`;
  }
  const { contactId } = req.params;

  const existingContact = await getContactById(contactId, req.user._id);

  if (
    existingContact === null ||
    existingContact.userId.toString() !== req.user._id.toString()
  ) {
    throw new createHttpError(404, 'Contact not found');
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    photo,
  };

  const result = await updateContact(contactId, contact);

  res.send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId, req.user._id);

  if (
    contact === null ||
    contact.userId === null ||
    contact.userId.toString() !== req.user._id.toString()
  ) {
    throw new createHttpError(404, 'Contact not found');
  }

  await deleteContact(contactId);

  res.status(204).send({});
}
