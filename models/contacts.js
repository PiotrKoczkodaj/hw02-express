import fs from 'fs/promises';
import Joi from 'joi';

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
     const results = contactsList.filter((contact) => {
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
  const idGenerator = Math.random().toString(36).substring(2, 12);
  const name = body.name;
  const email = body.email;
  const phone = body.phone;

  const validateContact = Joi.object({
    id: Joi.allow(),
    name: Joi.string().min(3).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
      .required(),
    phone: Joi.string().required(),
  });

  const correctContact = {
    ...validateContact.validate({ id: idGenerator, name, email, phone }),
  };

  if (correctContact.error === undefined) {
    fs.readFile("models/contacts.json")
      .then((data) => {
        const contacts = JSON.parse(data);
        contacts.push(correctContact.value);
        fs.writeFile("models/contacts.json", JSON.stringify(contacts));
      })
      .catch((err) => {
        console.log(err);
      });
    return correctContact.value;
  } else {
    return correctContact.error.details[0].message + " /status Code 400/";
  }
};

const removeContact = async (contactId, e) => {
  return fs
    .readFile("models/contacts.json")
    .then((data) => {
      const contactsList = JSON.parse(data);
      contactsList.map((contact) => {
        if (contact.id === contactId) {
          const index = contactsList.indexOf(contact);
          contactsList.splice(index, 1);
          fs.writeFile("models/contacts.json", JSON.stringify(contactsList));
        }
      });
      return "message: contact deleted status code:200";
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateContact = async (contactId, body) => {
  
  const name = body.name;
  const email = body.email;
  const phone = body.phone;

  const validateContact = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "pl"] } })
      .required(),
    phone: Joi.string().required(),
  });

  const correctContact = {
    ...validateContact.validate({ name, email, phone }),
  };

  if (correctContact.error === undefined) {
    const objectKeysLength = Object.keys(body).length;

    if (objectKeysLength < 3) {
      return "message: missing fields status code 404";
    }

    fs.readFile("models/contacts.json")
      .then((resp) => {
        const contacts = JSON.parse(resp);

        contacts.map((contact) => {
          const index = contacts.indexOf(contact);
          if (contactId === contact.id && objectKeysLength === 3) {
            contacts[index] = {
              id: contact.id,
              ...body,
            };
            fs.writeFile("models/contacts.json", JSON.stringify(contacts));
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return correctContact.error.details[0].message;
  }
};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
export {listContacts,getContactById,removeContact,addContact,updateContact}