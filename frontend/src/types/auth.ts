import { Gender, Role, UserLevel } from "../consts";

export type Token = string;

export type TokenData = {
  "refreshToken": Token,
  "accessToken": Token
}

export type UserData = {
  "email": string,
  "name": string,
  "password": string,
  "avatar": File,
  "gender": Gender,
  "birthDate": string,
  "description": string,
  "location": string,
  "questionnaire": UserQuestionnaire | CoachQuestionnaire,
  "role": Role
};

export type NewUser = {
  "email": string,
  "name": string,
  "password": string,
  "avatar": File,
  "gender": Gender,
  "birthDate": string,
  "description": string,
  "location": string,
  "backgroundImage": File
};

export type UpdateUser = {
  "name"?: string,
  "avatar"?: File,
  "gender"?: Gender,
  "birthDate"?: string,
  "description"?: string,
  "location"?: string
  "questionnaire"?: UserQuestionnaire | CoachQuestionnaire
};



export type AuthData = {
  email: string;
  password: string;
};

export type UserQuestionnaire = {
  userLevel: UserLevel;
  trainType: string[];
  trainDuration: string;
  calorieGoal: number;
  caloriePerDay: number;
  isReadyForTrain: boolean;
}

export type CoachQuestionnaire = {
  userLevel: UserLevel;
  trainType: string[];
  description: string;
  individualTraining: boolean;
}
