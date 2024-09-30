import { LOCATIONS } from "@backend/shared-core";

export const AUTH_USER_EXIST = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const AUTH_USER_UNAUTHORISED = 'Login to make any changes';

export const AuthenticationMessages = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  RefreshTokens: 'Get a new access/refresh tokens',
  WrongToken: 'Your token is not valid or expired',
  PasswordUpdated: 'Your password was successfully updated',
  Unauthorized: 'You should be authorized to change password',
  UserLogout: 'You was logout. All of your tokens were deleted'
} as const;


export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  NameNotValid: 'Name should be string with the length within 1-15 charactres',
  PasswordNotValid: 'Pssword should be string with the length within 6-12 charactres',
  Gender: 'Gender should be "мужской", "женский" or "неважно"',
  Description: 'Description should be string with the length within 10-140 charactres',
  Locations: `Available values for location is: ${LOCATIONS.join(',')}`
} as const;
