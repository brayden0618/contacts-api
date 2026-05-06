const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactsController.getAll);

// GET single contact
router.get('/:id', contactsController.getSingle);

module.exports = router;