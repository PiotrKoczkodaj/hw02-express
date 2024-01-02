const express = require('express');
const { listContacts,getContactById, addContact } = require('../../models/contacts');
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

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
