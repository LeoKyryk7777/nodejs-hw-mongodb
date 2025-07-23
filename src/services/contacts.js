import { Contact } from '../models/contacts.js';

export async function findAllContacts(
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (filter.type) {
    contactQuery.where('contactType').equals(filter.type);
  }

  const [totalItems, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
}

export function findContactsById(contactId) {
  return Contact.findById(contactId);
}

export function createContact(payload) {
  return Contact.create(payload);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function apdateContact(contactId, payload) {
  return Contact.findByIdAndUpdate(contactId, payload, { new: true });
}
