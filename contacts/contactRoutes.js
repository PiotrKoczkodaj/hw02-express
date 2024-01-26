import express from 'express';
import { listContacts, getContactById, addContact, removeContact, updateContact,updateStatusContact } from './contacts.js'
import { auth } from '../login/middleware.js';

const router = express.Router();

router.get('/',auth, async (req, res, next) => {
   res.json(await listContacts());
})

router.get('/:contactId',auth, async (req, res, next) => {
    res.json(await getContactById(req.params.contactId));
    
})

router.post('/',auth, async (req, res, next) => {
  res.json(await addContact(req.query))
})

router.delete('/:contactId',auth, async (req, res, next) => {
  res.json(await removeContact(req.params.contactId))
})

router.put('/:contactId',auth, async (req, res, next) => {
  res.json(await updateContact(req.params.contactId,req.query))
})

router.patch('/:contactId/favorite',auth, async (req, res, next) => {
  res.json(await updateStatusContact(req.params.contactId,req.query))
})

export { router as contactsRouter }