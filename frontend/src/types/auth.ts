import { Gender, Role, UserLevel } from "../consts";
import { TrainingRequest } from "./training-request";
import { Trainings } from "./trainings";

export type Token = string;

export type TokenData = {
  "refreshToken": Token,
  "accessToken": Token
}

export type UserData = {
  "id": string;
  "email": string,
  "name": string,
  "password": string,
  "avatar": File,
  "gender": Gender,
  "birthDate": string,
  "description": string,
  "location": string,
  "questionnaire": UserQuestionnaire | CoachQuestionnaire,
  "role": Role,
  "backgroundImage": string;
  "trainings": Trainings;
  "friends": UserFriend[];
  "recievedRequests": TrainingRequest[];
  "requests": TrainingRequest[];
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


export type Friend = {
  "id": string,
  "name": string,
  "avatar": File,
  "location": string,
  "trainTypes": string[],
  "role": Role,
  "trainingRequests"?: boolean
};

export type UserFriend = {
  "userId": string;
  "friendId": string;
}
