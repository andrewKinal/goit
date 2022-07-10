import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const contactsPath = path.join(process.cwd(), '/db/contacts.json')

const updateContacts = async ( contacts ) => {
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const listContacts = async () => {
    const result = await readFile( contactsPath )
    return JSON.parse( result )
}

const getContactById = async ( contactId ) => {
    const allContacts = await listContacts()
    const result = allContacts.find(item => item.id === contactId)

    if(!result) return null

    return result
}

const removeContact = async ( contactId ) => {
    const allContacts = await listContacts();
    const idx = allContacts.findIndex(item => item.id === contactId)
    if(idx === -1){
        return null
    }
    const [result] = allContacts.splice(idx, 1)
    await updateContacts(allContacts)
    return result
}
  
const addContact = async ( name, email, phone ) => {
    const allContacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    allContacts.push( newContact )
    await updateContacts( allContacts )
    return newContact
}

export {
    listContacts, getContactById, removeContact, addContact
}