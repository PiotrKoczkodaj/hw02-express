import express from 'express';
import { listContacts, getContactById, addContact, removeContact, updateContact,updateStatusContact } from '../../models/contacts.js'

const router = express.Router();

router.get('/', async (req, res, next) => {
   res.json(await listContacts());

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

router.patch('/:contactId/favorite', async (req, res, next) => {
  res.json(await updateStatusContact(req.params.contactId,req.query))
})

export { router as contactsRouter }