const db = require('../data/dbConfig.js');

module.exports = {
  add,
  update,
  remove,
  find,
  findById,
};

async function add(student) {
  const [id] = await db('students').insert(student);
  return db('students')
    .where({ id })
    .first();
}

async function update(id, changes) {
  return null;
}

async function remove(id) {
  await db('students').where({ id }).del();
  return db('students');
}

function find() {
  return db('students');
}

function findById(id) {
  return null;
}
