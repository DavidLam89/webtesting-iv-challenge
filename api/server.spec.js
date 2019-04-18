const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');
const Students = require('../students/studentsModel.js');

describe('server.js', () => {

  beforeEach(async () => {
    await db('students').truncate();
    await Students.add({ name: 'David1' });
    await Students.add({ name: 'David2' });
  });

  describe('GET /students', () => {

    it('should respond with 200 OK', () => {
      return request(server)
        .get('/students')
        .then(response => {
          expect(200);
        });
    });

    it('should return JSON', () => {
      return request(server)
        .get('/students')
        .then(res => {
          expect(res.type).toBe('application/json');
        });
    });

    it('should return array of students', () => {
      return request(server)
        .get('/students')
        .then(res => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });
  });

  describe('POST /student', () => {

    it('should return the student object if succeed', () => {
      return request(server)
        .post('/student')
        .send({name: 'David1'})
        .then(res => {
          expect(res.body).toBeInstanceOf(Object);
        });
    });

    it('should return the student info if succeed', () => {
      return request(server)
        .post('/student')
        .send({name: 'David1'})
        .then(res => {
          expect(res.body.name).toBe('David1');
        });
    });
  });

  describe('DELETE /:id', () => {

    it('should remove the student', async () => {
      return request(server)
        .delete('/1')
        .then(res => {
          expect(res.body).toHaveLength(1);
        });
    });

    it('should remove the correct student', async () => {
      
      return request(server)
        .delete('/2')
        .then(res => {
          expect(res.body.find(e=>{
           return e.name==='David2' 
          })).toBeUndefined();
        });
    });
  });
});
