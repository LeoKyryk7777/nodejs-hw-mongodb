import { Contact } from '../models/contacts.js';

export async function findAllContacts(
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find({ userId });

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

export function findContactsById(contactId, userId) {
  return Contact.findOne({ _id: contactId, userId });
}

export function createContact(payload) {
  return Contact.create(payload);
}

export function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete({ _id: contactId, userId });
}

export function apdateContact(contactId, payload, userId) {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
  });
}
