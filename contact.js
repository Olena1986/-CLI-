import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve('db', 'contacts.json');

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}; 

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
};

const contactsService = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

export default contactsService;

