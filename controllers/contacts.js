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
    const result = await mongodb.getDb().collection('contacts').find({ _id: id });
    const contact = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getSingle };