import { Contact } from "./contactSchema.js";
import { User } from '../registeration/userSchema.js';
import jwt from 'jsonwebtoken';

const listContacts = async (req) => {

  const tokenFromRequest = req.headers.authorization;
  const tokenWithoutBearer = tokenFromRequest.slice(7)
  const userFromToken = jwt.decode(tokenWithoutBearer);

  const contacts = await Contact.find({owner:userFromToken.email});

 return contacts.map(contact => {
    if (contact.owner === userFromToken.email) {
       return contact ;
    } 
  })
  
};

const getContactById = async (req) => {
  const contactById = await Contact.findOne({ _id: req.params.contactId });
  
  const tokenFromRequest = req.headers.authorization;
  const tokenWithoutBearer = tokenFromRequest.slice(7)
  const userFromToken = jwt.decode(tokenWithoutBearer);

  if (userFromToken.email === contactById.owner) {
    return contactById;
  }
  
};

const addContact = async (req) => {

  const tokenFromRequest = req.headers.authorization;
  const tokenWithoutBearer = tokenFromRequest.slice(7)
  const userFromToken = jwt.decode(tokenWithoutBearer);

   const contact = new Contact({
    name: req.query.name,
    email: req.query.email,
    phone: req.query.phone,
    owner: userFromToken.email,
   });
  
  if (userFromToken.email === contact.owner) {
  contact.save();
  console.log('Dodano do listy kontaktów')
  } 
};

const removeContact = async (req) => {

  const tokenFromRequest = req.headers.authorization;
  const tokenWithoutBearer = tokenFromRequest.slice(7)
  const userFromToken = jwt.decode(tokenWithoutBearer);

  const contact = await Contact.findOne({ _id: req.params.id })

  if (userFromToken.email === contact.owner) {
    await Contact.findByIdAndDelete({ _id: req.params.id });
  }
  
};

const updateContact = async (req, body) => {

  const tokenFromRequest = req.headers.authorization;
  const tokenWithoutBearer = tokenFromRequest.slice(7)
  const userFromToken = jwt.decode(tokenWithoutBearer);

  const contact = await Contact.findOne({ _id: req.params.id })

  if (userFromToken.email === contact.owner) {
await Contact.findByIdAndUpdate({_id:req.params.id},{...body})
  }
  
};

const updateStatusContact = async (req, body) => {

  const tokenFromRequest = req.headers.authorization;
  const tokenWithoutBearer = tokenFromRequest.slice(7)
  const userFromToken = jwt.decode(tokenWithoutBearer);

  const contact = await Contact.findOne({ _id: req.params.id })

  if (userFromToken.email === contact.owner) {

     if (body) {
     await Contact.findByIdAndUpdate({ _id: req.params.id }, { favorite:body.favorite })
  } else {
   return {"message": "missing field favorite"}
}

  }

 
}

export {listContacts,getContactById,removeContact,addContact,updateContact,updateStatusContact}
