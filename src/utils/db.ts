import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import omit from 'lodash/omit';
import { Classroom, Lesson, StudentGroup } from '../models';

const getUpdateRecordSQL = (obj: Record<string, any>) => Object.keys(omit(obj, 'id'))
  .reduce((acc, key) => `${acc} ${key} = ${obj[key]}`, '');

let pool: Database;

const initDb = async () => {
  pool = await open({
    filename: './db.db',
    driver: sqlite3.Database,
  });
};

const insertStudentGroup = async (group: StudentGroup) => {
  await pool.run('INSERT INTO studentGroup(id, shortName, isScrapped) VALUES (:id, :shortName, :isScrapped)', {
    ':shortName': group.shortName,
    ':id': group.id,
    ':isScrapped': group.isScrapped,
  });
};

const insertLesson = async (lesson: Lesson) => {
  await pool.run('INSERT INTO lesson(id, type, isEven, classroom, weekday) VALUES (:id, :type, :isEven, :classroom, :weekday)', {
    ':id': lesson.id,
    ':type': lesson.type,
    ':isEven': lesson.isEven,
    ':classroom': lesson.classroom,
    ':weekday': lesson.weekday,
  });
};

const insertClassroom = async (lesson: Classroom) => {
  await pool.run('INSERT INTO classroom(id, room) VALUES (:id, :room)', {
    ':id': lesson.id,
    ':room': lesson.room,
  });
};

const allStudentGroups = async () => pool.all<StudentGroup[]>('SELECT * FROM studentGroup');

const allClassrooms = async () => pool.all<Classroom[]>('SELECT * FROM classroom');

const updateStudentGroup = async (newValue: Partial<StudentGroup>, id: string) => {
  const sql = getUpdateRecordSQL(newValue);
  await pool.exec(`UPDATE studentGroup SET ${sql} where id = '${id}'`);
};

const db = {
  initDb,
  insertStudentGroup,
  allStudentGroups,
  allClassrooms,
  updateStudentGroup,
  insertLesson,
  insertClassroom,
};

export default db;
