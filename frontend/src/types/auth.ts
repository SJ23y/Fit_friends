import { Gender } from "../consts";

export type Token = string;

export type UserData = {
  "email": string,
  "name": string,
  "password": string,
  "avatar": File,
  "gender": Gender,
  "birthDate": string,
  "description": string,
  "location": string,
  "backgroundImage": File,
  "refreshToken": Token,
  "accessToken": Token
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

