const express = require('express');

const students = require('../students/studentsModel.js');

const server = express();

server.use(express.json());

server.get('/students', async (req, res) => {
  const list = await students.find();
  res.status(200).json(list);
});

server.post('/student', async (req, res) => {
  const student = await students.add(req.body);
  res.status(200).json(student);
});

server.delete('/:id', async (req, res) => {
  try {
  const list = await students.remove(req.params.id);
  res.status(200).json(list);
  } catch (error) {
    res.status(500).json({
      message: 'Error removing the student'});
  }
});

module.exports = server;

