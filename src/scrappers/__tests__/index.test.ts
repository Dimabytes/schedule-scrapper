import path from 'path';
import fs from 'fs';
import cheerio from 'cheerio';

import { scrapStudentGroups, scrapSchedule } from '..';

let uuidValue = 0;

jest.mock('uuid', () => ({
  v4: () => {
    uuidValue += 1;
    return uuidValue.toString();
  },
}));

const getFixturePath = (filename: string) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename: string) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStudentsGroups = JSON.parse(readFile('expectedStudentGroups.json'));
const expectedSchedule = JSON.parse(readFile('expectedShedule.json'));

describe('scrappers', () => {
  beforeEach(() => {
    uuidValue = 0;
  });
  const $ = cheerio.load(readFile('schedule.html'));
  test('studentGroups', () => {
    const groups = scrapStudentGroups($);

    expect(groups).toEqual(expectedStudentsGroups);
  });

  test('schedule', () => {
    const schedule = scrapSchedule($, []);

    expect(schedule).toEqual(expectedSchedule);
  });
});
