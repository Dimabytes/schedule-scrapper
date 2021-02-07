import db from './utils/db';
import { scrapStudentGroups, scrapSchedule } from './scrappers';
import { CheerioRoot } from './models';
import { initBrowser, getPage, reload } from './utils/browser';

const baseUrl = 'https://www.voenmeh.ru/trainee/timetable-stud';

const loadStudentGroups = async ($: CheerioRoot) => {
  const dbGroups = await db.allStudentGroups();
  if (dbGroups.length !== 0) {
    return dbGroups;
  }
  const groups = scrapStudentGroups($);
  const promiseArray = groups.map(db.insertStudentGroup);
  await Promise.all(promiseArray);
  return groups;
};

let counter = 0;

const main = async () => {
  await db.initDb();
  await initBrowser();
  const mainPage = await getPage(baseUrl);
  const notScrappedGroups = (await loadStudentGroups(mainPage)).filter((el) => el.isScrapped === 0);
  let knownClassrooms = await db.allClassrooms();
  for (const group of notScrappedGroups) {
    const groupUrl = `${baseUrl}#${group.shortName}`;
    const groupPage = await getPage(groupUrl);
    await reload();
    const { newClassrooms, newLessons } = scrapSchedule(groupPage, knownClassrooms);
    for (const lesson of newLessons) {
      await db.insertLesson(lesson);
    }
    for (const classroom of newClassrooms) {
      await db.insertClassroom(classroom);
    }
    knownClassrooms = [...knownClassrooms, ...newClassrooms];
    await db.updateStudentGroup({ isScrapped: 1 }, group.id);

    counter += 1;
    console.log(group.shortName);
    console.log(knownClassrooms.length, newLessons.length);
    console.log(counter, notScrappedGroups.length);
  }
};

main();
