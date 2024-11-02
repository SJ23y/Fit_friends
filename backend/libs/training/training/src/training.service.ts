import { DEFAULT_TRAIN_IMAGE_NAMES, DEFAULT_VIDEO_NAMES, PaginationResult, Role, TokenPayload } from "@backend/shared-core";
import { TrainingQuery } from "./training.query";
import { TrainigRepository } from "./training.repository";
import { TrainingEntity } from "./training.entity";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthenticationService } from "@backend/authentication";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { FileManagerService } from "@backend/file-manager";
import { getRanndomElement } from "@backend/shared-helpers";

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainigRepository: TrainigRepository,
    private readonly userService: AuthenticationService,
    private readonly fileService: FileManagerService,
  ) {}


  public async createTraining(dto: CreateTrainingDto, user: TokenPayload, file: Express.Multer.File):  Promise<TrainingEntity> {
    if (user.role !== Role.COACH) {
      throw new ConflictException('Данное действие доступно только тренерам');
    }

    const video = await this.fileService.writeFile(file);

    const trainingEntity = new TrainingEntity({
      ...dto,
      coachId: user.sub,
      video: video?.replace(/\\/g, '/') ?? getRanndomElement(DEFAULT_VIDEO_NAMES),
      image: getRanndomElement(DEFAULT_TRAIN_IMAGE_NAMES),
      rate: 0
    })
    await this.trainigRepository.save(trainingEntity);
    return trainingEntity;
  }

  public async getAllTrainings(userId: string, query?: TrainingQuery, ): Promise<PaginationResult<TrainingEntity>> {
    const existUser = await this.userService.getUser(userId);
    return await this.trainigRepository.getAllTrainings(query, existUser.toPOJO());
  }

  public async getTraining(trainingId: string):  Promise<TrainingEntity | null> {
    const currentTraining =  await this.trainigRepository.getTrainingById(trainingId);

    if (!currentTraining) {
      throw new NotFoundException(`Training with id ${trainingId} not found`);
    }

    return currentTraining;
  }

  public async updateTrainingRating(trainingId: string, rating: number):  Promise<TrainingEntity | null> {
    console.log('in training update service')
    const currentTraining =  await this.trainigRepository.getTrainingById(trainingId);

    if (!currentTraining) {
      throw new NotFoundException(`Training with id ${trainingId} not found`);
    }
    currentTraining.rate = (currentTraining.rate > 0) ? (currentTraining.rate + rating) / 2 : currentTraining.rate + rating;
    console.log('new rate: ', currentTraining.rate)
    await this.trainigRepository.update(currentTraining);

    return currentTraining;
  }
}
