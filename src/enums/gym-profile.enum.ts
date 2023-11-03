export enum GymType {
  'Fitness Studio' = 100,
  'Trainer' = 200,
  'Wellness Center' = 300,
}

export enum RegistrationMode {
  APP = 100,
  WEB = 200,
}

export const getGymBusinessCategoryText = {
  100: 'Fitness Studio',
  200: 'Trainer',
  300: 'Wellness Center',
};

export const getGymTypeByValue = (value: number): GymType | undefined => {
  const key = Object.keys(GymType).find(
    (k) => GymType[k as keyof typeof GymType] === value,
  );
  return key ? GymType[key as keyof typeof GymType] : undefined;
};

export const getRegistrationModeByValue = (
  value: number,
): RegistrationMode | undefined => {
  const key = Object.keys(GymType).find(
    (k) => RegistrationMode[k as keyof typeof RegistrationMode] === value,
  );
  return key
    ? RegistrationMode[key as keyof typeof RegistrationMode]
    : undefined;
};
