import { DEFAULT_TRAIN_RATE, Entity, Gender, StorableEntity, TrainDuration, Training, UserLevel } from '@backend/shared-core';

export class TrainingEntity extends Entity implements StorableEntity<Training> {
  public title: string;
  public image: string;
  public level: UserLevel;
  public type: string;
  public duration: TrainDuration;
  public price: number;
  public callorieQuantity: number;
  public description: string;
  public gender: Gender;
  public video: string;
  public rate: number;
  public coach?: string;
  public isSpecialOffer: boolean;
  public createdAt?: Date;
  public coachId: string;

  constructor(training?: Training) {
    super();

    this.populate(training);
  }

  private populate(training?: Training) {
    if (training) {
    this.id = training.id ?? '';
    this.title = training.title;
    this.image = training.image;
    this.level = training.level;
    this.type =  training.type;
    this.duration = training.duration;
    this.price = training.price;
    this.callorieQuantity = training.callorieQuantity;
    this.description = training.description;
    this.gender = training.gender;
    this.video = training.video;
    this.rate = training.rate ?? DEFAULT_TRAIN_RATE;
    this.coach = training.coach ?? undefined;
    this.isSpecialOffer = training.isSpecialOffer ?? false;
    this.createdAt = training.createdAt ?? undefined;
    this.coachId = training.coachId;
  }
  }

  public toPOJO(): Training {
    return {
      id: (this.id) ? this.id : undefined,
      title: this.title,
      image: this.image,
      level: this.level,
      type: this.type,
      duration: this.duration,
      price: this.price,
      callorieQuantity: this.callorieQuantity,
      description: this.description,
      gender: this.gender,
      video: this.video,
      rate: this.rate,
      coach: this.coach,
      isSpecialOffer: this.isSpecialOffer,
      createdAt: this.createdAt,
      coachId: this.coachId
    }
  }
}
