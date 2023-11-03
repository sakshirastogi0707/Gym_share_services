export enum ExperienceLevel {
  BEGINNER = 'Beginner',
  EXPERIENCED = 'Experienced',
  INTERMEDIATE = 'Intermediate',
}

export const getFitnessExperienceStatusByValue = (value: any) => {
  return Object.keys(ExperienceLevel)[
    Object.values(ExperienceLevel).indexOf(value)
  ];
};
