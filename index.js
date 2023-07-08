import contactsService from './contact.js'
import {program} from "commander";

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contactsService.listContacts().then((contacts) => console.log('Contacts:', contacts));
      break;

    case 'get':
      contactsService.getContactById(id).then((contact) => console.log('Contact:', contact || 'Contact not found'));
      break;

    case 'add':
      contactsService.addContact(name, email, phone)
        .then((newContact) => console.log('New Contact:', newContact))
        .catch((error) => console.error('Error adding contact:', error));
      break;

    case 'remove':
      contactsService.removeContact(id)
        .then(() => console.log('Contact removed successfully.'))
        .catch((error) => console.error('Error removing contact:', error));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
