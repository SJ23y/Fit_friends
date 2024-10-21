import { Gender, UserLevel } from "../consts";

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
  "questionnaire": Questionnaire
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



export type AuthData = {
  email: string;
  password: string;
};

export type Questionnaire = {
  userLevel: UserLevel;
  trainType: string[];
  trainDuration: string;
  calorieGoal: number;
  caloriePerDay: number;
  isReadyForTrain: boolean;
}
