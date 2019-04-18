const db = require('../data/dbConfig.js');
const Students = require('./studentsModel.js');

describe('students model', () => {

  beforeEach(async () => {
    await db('students').truncate();
  });

  describe('add()', () => {

    it('should add the students to database', async () => {
      await Students.add({ name: 'David1' });
      await Students.add({ name: 'David2' });
      await Students.add({ name: 'David3' });

      const list = await db('students');
      expect(list).toHaveLength(3);
    });

    it('should add the student', async () => {
      let student = await Students.add({ name: 'David1' });
      expect(student.name).toBe('David1');

      student = await Students.add({ name: 'David2' });
      expect(student.name).toBe('David2');
    });
  });

  describe('remove()', () => {

    it('should remove a student from database', async () => {
      await Students.add({ name: 'David1' });
      await Students.add({ name: 'David2' });
      await Students.remove(1);
      const list = await db('students');
      expect(list).toHaveLength(1);
    });

    it('should remove the correct student from database', async () => {
      await Students.add({ name: 'David1' });
      await Students.add({ name: 'David2' });
      let student = db('students').where({id:2}).first();
      expect(student).toBeDefined();
      await Students.remove(2);
      student = await db('students').where({id:2}).first();
      expect(student).toBeUndefined();
    });
  });
});
