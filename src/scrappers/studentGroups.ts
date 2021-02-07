import { v4 as uuidv4 } from 'uuid';
import { CheerioRoot, StudentGroup } from '../models';

export const scrapStudentGroups = ($: CheerioRoot): StudentGroup[] => {
  const groups = $('#cbxGroupNumber option').toArray();

  return groups.map((group) => ({
    shortName: group.attribs.value,
    id: uuidv4(),
    isScrapped: 0,
  }));
};
