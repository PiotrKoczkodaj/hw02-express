import { Contact } from "./contactSchema.js";

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contactById = await Contact.findOne({_id:contactId});
  return contactById;
};

const addContact = async (body) => {
  const contact = new Contact({
    name: body.name,
    email: body.email,
    phone: body.phone
  });
  contact.save();
  console.log('Dodano do listy kontaktów')
};

const removeContact = async (contactId) => {
  await Contact.findByIdAndDelete({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  await Contact.findByIdAndUpdate({_id:contactId},{...body})
};

const updateStatusContact = async (contactId, body) => {
  if (body) {
     await Contact.findByIdAndUpdate({ _id: contactId }, { favorite:body.favorite })
  } else {
   return {"message": "missing field favorite"}
}
}

export {listContacts,getContactById,removeContact,addContact,updateContact,updateStatusContact}
