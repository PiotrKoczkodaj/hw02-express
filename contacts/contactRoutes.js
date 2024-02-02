import { auth } from '../login/middleware.js';
import express from 'express';
import { listContacts, getContactById, addContact, removeContact, updateContact,updateStatusContact } from './contacts.js'

const router = express.Router();

router.get('/',auth, async (req, res, next) => {
   res.json(await listContacts(req));
})

router.get('/:contactId',auth, async (req, res, next) => {
    res.json(await getContactById(req));
    
})

router.post('/',auth, async (req, res, next) => {
  res.json(await addContact(req))
})

router.delete('/:contactId',auth, async (req, res, next) => {
  res.json(await removeContact(req))
})

router.put('/:contactId',auth, async (req, res, next) => {
  res.json(await updateContact(req,req.query))
})

router.patch('/:contactId/favorite',auth, async (req, res, next) => {
  res.json(await updateStatusContact(req,req.query))
})

export { router as contactsRouter }