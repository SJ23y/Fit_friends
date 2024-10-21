import { LOCATIONS, TRAIN_TYPES, TrainDuration, UserLevel } from "@backend/shared-core";

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
  EmailNotValid: 'Email is not valid',
  NameLengthNotValid: 'Name should be string with the length within 1-15 charactres',
  NameNotValid: 'Name should be consist only of latin or russian letters',
  PasswordNotValid: 'Password should be string with the length within 6-12 charactres',
  Gender: 'Gender should be "мужской", "женский" or "неважно"',
  Description: 'Description should be string with the length within 10-140 charactres',
  Locations: `Location available values is: ${LOCATIONS.join(',')}`,
  Role: 'Role value should be user or coach',
  InvalidUserLevel: `User level available values is: ${Object.values(UserLevel).join(',')}`,
  InvalidTrainType: `Train types available values is: ${TRAIN_TYPES.join(',')}`,
  InvalidTrainDuration: `Train durtion available values is: ${Object.values(TrainDuration).join(',')}`,
  InvalidCallorieGoalQuantity: 'Callorie goal should be in the range 1000-5000',
  InvalidCalloriePerDayQuantity: 'Callorie per day should be in the range 1000-5000',
} as const;
