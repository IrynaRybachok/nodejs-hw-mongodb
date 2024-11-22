import { Contact } from '../models/contacts.js';

export async function getAllContacts() {
  return await Contact.find();
}

export async function getContactById(id) {
  return await Contact.findById(id);
}

export async function createContact(contact) {
  return await Contact.create(contact);
}

export async function updateContact(id, contact) {
  return await Contact.findByIdAndUpdate(id, contact, { new: true });
}

export function deleteContact(id) {
  return Contact.findByIdAndDelete(id); // findOneAndDelete({ _id: contactId })
}
