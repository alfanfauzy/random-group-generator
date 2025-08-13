import { shuffleArray } from "./shuffleArray";

export type Group = {
  id: number;
  name: string;
  members: string[];
};

export function groupPeople(names: string[], groupCount: number): Group[] {
  const shuffledNames = shuffleArray(names);
  const groups: Group[] = [];

  for (let i = 0; i < Math.min(groupCount, names.length); i++) {
    groups.push({ id: i + 1, name: `Group ${i + 1}`, members: [] });
  }

  shuffledNames.forEach((name, index) => {
    const groupIndex = index % groups.length;
    groups[groupIndex].members.push(name);
  });

  return groups;
}
