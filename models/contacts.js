const fs = require("fs").promises;
const Joi = require('joi');


const listContacts = async () => {
  return fs
    .readFile("models/contacts.json")
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getContactById = async (contactId) => {
  return fs
    .readFile("models/contacts.json")
    .then((resp) => {
      const contactsList = JSON.parse(resp);
      results = contactsList.filter((contact) => {
        return contact.id === contactId;
      });

      if (results[0] === undefined) {
        return JSON.stringify(`{ message:Not found}`);
      }
      return results[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

const addContact = async (body) => {
  const idGenerator = Math.random().toString(36).substring(2, 12)
  const name = body.name;
  const email = body.email;
  const phone = body.phone;
  
  
  const validateContact = Joi.object({
    id:Joi.allow(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl'] } }).required(),
    phone: Joi.string().required()
  });

   const correctContact = {
    ...validateContact.validate({id:idGenerator,name,email,phone})
    }

  if (correctContact.error === undefined) {
    fs.readFile("models/contacts.json").then(data => {
      const contacts = JSON.parse(data);
      contacts.push(correctContact.value)
      fs.writeFile("models/contacts.json", JSON.stringify(contacts));
    });
    return correctContact.value
  } else {
    return correctContact.error.details[0].message + ' /status Code 400/'
    }
    
  
  
  // return fs.appendFile("models/contacts.json",
    
  // )
};

const removeContact = async (contactId) => {};



const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
