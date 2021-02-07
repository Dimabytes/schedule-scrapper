import { v4 as uuidv4 } from 'uuid';
import {
  CheerioRoot, russianWeekdayWeekMap, Classroom, Lesson, lessonTypeTimeMap,
} from '../models';

const parseTimeAndEven = (timeCellText: string) => {
  const arr = timeCellText.split(' ');
  return {
    type: lessonTypeTimeMap[arr[0].trim() as keyof typeof lessonTypeTimeMap],
    isEven: arr[1] === 'Нечетная' ? 1 : 0,
  };
};

export const scrapSchedule = ($: CheerioRoot, knownClassrooms: Classroom[]) => {
  const newClassrooms: Classroom[] = [];
  const newLessons: Lesson[] = [];

  const getOrCreateClassroom = (room: string): Classroom => {
    const classroom = [...knownClassrooms, ...newClassrooms].find((el) => el.room === room);
    if (classroom !== undefined) {
      return classroom;
    }
    const newClassroom = {
      room,
      id: uuidv4(),
    };
    newClassrooms.push(newClassroom);
    return newClassroom;
  };

  const timetables = $('.timetable_table').toArray();
  timetables.forEach((timetable) => {
    const russianDayOfWeek = $(timetable).find('.timetable_table_day_row')
      .text()
      .toLowerCase()
      .trim() as keyof typeof russianWeekdayWeekMap;
    const weekday = russianWeekdayWeekMap[russianDayOfWeek];
    const tableRows = $(timetable).find('.timetable_table_content tr').toArray().slice(1);

    tableRows.forEach((tableRow) => {
      const timeCellText = $(tableRow).find('td:first-child').text();
      const roomCellText = $(tableRow).find('td:last-child').text().split(';')[0];
      if (roomCellText === '') {
        return;
      }
      const classroom = getOrCreateClassroom(roomCellText);
      const { type, isEven } = parseTimeAndEven(timeCellText);
      const newLesson = {
        classroom: classroom.id,
        id: uuidv4(),
        type,
        isEven,
        weekday,
      };
      newLessons.push(newLesson);
    });
  });

  return {
    newLessons,
    newClassrooms,
  };
};
