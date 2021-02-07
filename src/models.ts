/* eslint-disable no-shadow, no-unused-vars */

import cheerio from 'cheerio';

export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export const russianWeekdayWeekMap = {
  понедельник: Weekday.Monday,
  вторник: Weekday.Tuesday,
  среда: Weekday.Wednesday,
  четверг: Weekday.Thursday,
  пятница: Weekday.Friday,
  суббота: Weekday.Saturday,
  воскресенье: Weekday.Sunday,
};

export interface StudentGroup {
  shortName: string;
  id: string;
  isScrapped: number;
}

export interface Classroom {
  room: string;
  id: string;
}

export enum LessonType {
  Lesson1 = 'Lesson1',
  Lesson2 = 'Lesson2',
  Lesson3 = 'Lesson3',
  Lesson4 = 'Lesson4',
  Lesson5 = 'Lesson5',
  Lesson6 = 'Lesson6',
}

export const lessonTypeTimeMap = {
  '9:00': LessonType.Lesson1,
  '10:50': LessonType.Lesson2,
  '12:40': LessonType.Lesson3,
  '14:55': LessonType.Lesson4,
  '16:45': LessonType.Lesson5,
  '18:30': LessonType.Lesson6,
};

export interface Lesson {
  id: string;
  isEven: number;
  classroom: string;
  weekday: Weekday;
  type: LessonType;
}

export type CheerioRoot = ReturnType<typeof cheerio.load>;
