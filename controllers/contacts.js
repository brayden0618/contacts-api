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

module.exports = { getAll, getSingle };