import * as fs from 'node:fs/promises';
import path from 'node:path';
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
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

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
    req.user.id,
  );
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const contact = await findContactsById(contactId, req.user.id);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  // await fs.rename(
  //   req.file.path,
  //   path.resolve('src/uploads/photo', req.file.filename),
  // );
  const result = await uploadToCloudinary(req.file.path);
  await fs.unlink(req.file.path);

  const contact = await createContact({
    ...req.body,
    // photo: `http://localhost:5050/photo/${req.file.filename}`,
    photo: result.secure_url,
    userId: req.user.id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function deleteContactController(req, res) {
  const result = await deleteContact(req.params.contactId, req.user.id);
  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).end();
}

export async function apdateContactController(req, res) {
  const result = await apdateContact(
    req.params.contactId,
    req.body,
    req.user.id,
  );
  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
