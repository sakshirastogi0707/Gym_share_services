export declare enum GymType {
    'Fitness Studio' = 100,
    'Trainer' = 200,
    'Wellness Center' = 300
}
export declare enum RegistrationMode {
    APP = 100,
    WEB = 200
}
export declare const getGymBusinessCategoryText: {
    100: string;
    200: string;
    300: string;
};
export declare const getGymTypeByValue: (value: number) => GymType | undefined;
export declare const getRegistrationModeByValue: (value: number) => RegistrationMode | undefined;
