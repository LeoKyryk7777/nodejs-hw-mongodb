import {
  findAllContacts,
  findContactsById,
  createContact,
  deleteContact,
  apdateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export async function getContactsController(req, res) {
  const contacts = await findAllContacts();
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
  res.json({ status: 200, message: 'Contact deleted' });
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
