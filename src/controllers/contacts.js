import {
  findAllContacts,
  findContactsById,
  createContact,
  deleteContact,
  apdateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await findAllContacts(
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  );
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const contact = await findContactsById(contactId);
  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactControler(req, res) {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function deleteContactControler(req, res) {
  const result = await deleteContact(req.params.contactId);
  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).end();
}

export async function apdateContactControler(req, res) {
  const result = await apdateContact(req.params.contactId, req.body);
  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
