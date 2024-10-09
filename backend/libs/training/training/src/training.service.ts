import { PaginationResult } from "@backend/shared-core";
import { TrainingQuery } from "./training.query";
import { TrainigRepository } from "./training.repository";
import { TrainingEntity } from "./training.entity";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainigRepository: TrainigRepository
  ) {}

  public async getAllTrainings(query?: TrainingQuery): Promise<PaginationResult<TrainingEntity>> {
    return await this.trainigRepository.getAllTrainings(query);
  }

  public async getTraining(trainingId: string):  Promise<TrainingEntity | null> {
    const currentTraining =  await this.trainigRepository.getTrainingById(trainingId);

    if (!currentTraining) {
      throw new NotFoundException(`Training with id ${trainingId} not found`);
    }

    return currentTraining;
  }

  public async updateTrainingRating(trainingId: string, rating: number):  Promise<TrainingEntity | null> {
    const currentTraining =  await this.trainigRepository.getTrainingById(trainingId);

    if (!currentTraining) {
      throw new NotFoundException(`Training with id ${trainingId} not found`);
    }
    currentTraining.rate = (currentTraining.rate > 0) ? (currentTraining.rate + rating) / 2 : currentTraining.rate + rating;
    await this.trainigRepository.update(currentTraining);

    return currentTraining;
  }
}
