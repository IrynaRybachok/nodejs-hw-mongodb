import { Contact } from '../models/contacts.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  // const contactQuery = Contact.find();

  const query = {};
  if (filter.isFavourite !== undefined) {
    query.isFavourite = filter.isFavourite;
  }
  if (filter.type) {
    query.contactType = filter.type;
  }

  const [total, data] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
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
