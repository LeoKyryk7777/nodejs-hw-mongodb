import { Contact } from '../models/contacts.js';

export async function findAllContacts() {
  return await Contact.find();
}

export async function findContactsById(contactId) {
  return await Contact.findById(contactId);
}

export async function createContact(payload) {
  return await Contact.create(payload);
}

export async function deleteContact(contactId) {
  return await Contact.findByIdAndDelete(contactId);
}

export async function apdateContact(contactId, payload) {
  return await Contact.findByIdAndUpdate(contactId, payload, { new: true });
}
