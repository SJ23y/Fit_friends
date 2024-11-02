import { Gender, TRAIN_TYPES, TrainDuration, TrainingValidationSetting, UserLevel } from "@backend/shared-core";

export const TrainingValidationMsssages = {
  TitleInvalid: `Title should be string with length bewtween ${TrainingValidationSetting.TITLE_MIN_LENGTH} and ${TrainingValidationSetting.TITLE_MAX_LENGTH}`,
  LevelInvalid: `Level available values is: ${Object.values(UserLevel)}`,
  TypeInvalid: `Type available values is: ${TRAIN_TYPES}`,
  DurationInvalid: `Duration available values is: ${Object.values(TrainDuration)}`,
  PriceInvalid: 'Price should be a number',
  CalloriesInvalid: `CalloriesQuantity should be the number between ${TrainingValidationSetting.CALLORIES_MIN_COUNT} and ${TrainingValidationSetting.CALLORIES_MAX_COUNT}`,
  DescriptionInvalid: `Desciption should be string with length bewtween ${TrainingValidationSetting.DESCRIPTION_MIN_LENGTH} and ${TrainingValidationSetting.DESCRIPTION_MAX_LENGTH}`,
  GenderInvalid: `Gender available values is: ${Object.values(Gender)}`,
  SpecialInvalid: 'IsSpecialOffer should be of a boolean type'
} as const;
