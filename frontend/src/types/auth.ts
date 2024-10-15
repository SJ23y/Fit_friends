import { Gender } from "../consts";

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
  "location": string
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

