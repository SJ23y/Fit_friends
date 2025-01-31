export const TRAIN_TYPES = ['йога', 'бег', 'бокс', 'стрейчинг', 'кроссфит', 'аэробика', 'пилатес'];

export enum TrainDuration {
  EXPRESS = '10-30 мин',
  FAST = '30-50 мин',
  MEDIUM = '50-80 мин',
  LONG = '80-100 мин'
};

export const DEFAULT_TRAIN_RATE = 0;

export const MAX_TRAINING_COUNT_LIMIT = 50;
export const MAX_FEATURED_COUNT_LIMIT = 9;
export const MAX_REVIEW_COUNT_LIMIT = 50;

export enum TrainingValidationSetting {
  TITLE_MAX_LENGTH = 15,
  TITLE_MIN_LENGTH = 1,
  CALLORIES_MAX_COUNT = 5000,
  CALLORIES_MIN_COUNT = 1000,
  DESCRIPTION_MAX_LENGTH = 140,
  DESCRIPTION_MIN_LENGTH = 10,

}
