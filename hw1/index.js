import { Command } from 'commander'
import {
    addContact,
    getContactById,
    listContacts,
    removeContact 
} from './contacts.js'

const program = new Command()
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");


program.parse(process.argv)
const argv = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch ( action ) {
        case "list":
          const list = await listContacts()
          console.table(list)
          break;
    
        case "get":
          const contact = await getContactById( id )
          console.log(contact)
          break;
    
        case "add":
          const addedContact = await addContact( name, email, phone )
          console.log(addedContact)
          break;
    
        case "remove":
          const removedContact = await removeContact( id )
          console.log(removedContact)
          break;
    
        default:
          console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv)