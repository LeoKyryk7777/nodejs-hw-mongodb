import { Contact } from '../models/contacts.js';

export async function findAllContacts() {
  return await Contact.find();
}

export async function findContactsById(contactId) {
  return await Contact.findById(contactId);
}
