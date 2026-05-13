const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single
const getSingle = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const contact = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response.insertedId);
    } else {
      res.status(500).json(response.error || 'Some error occurred.');
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred.');
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred.');
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };