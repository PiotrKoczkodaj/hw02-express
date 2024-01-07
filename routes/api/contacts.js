import express from 'express';
import { listContacts, getContactById, addContact, removeContact, updateContact } from '../../models/contacts'

const router = express.Router();

router.get('/', async (req, res, next) => {
   res.json(JSON.parse(await listContacts()));

})

router.get('/:contactId', async (req, res, next) => {
    res.json(await getContactById(req.params.contactId));
    
})

router.post('/', async (req, res, next) => {
  res.json(await addContact(req.query))
})

router.delete('/:contactId', async (req, res, next) => {
  res.json(await removeContact(req.params.contactId))
})

router.put('/:contactId', async (req, res, next) => {
  res.json(await updateContact(req.params.contactId,req.query))
})


export router as contactsRouter