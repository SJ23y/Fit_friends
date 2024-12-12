import { EntityFactory,  RequestForTraining } from "@backend/shared-core";
import { Injectable } from "@nestjs/common";
import { TrainingRequestEntity } from "./training-request.entity";

@Injectable()
export class TrainingRequestFactory implements EntityFactory<TrainingRequestEntity> {
  public create(entityPlainData: RequestForTraining): TrainingRequestEntity {
    return new TrainingRequestEntity(entityPlainData);
  }
  /*
  static createFromDb({name, location, avatar, id, questionnaire, role}: Pick<AuthUser, 'name' | 'location' | 'avatar' | 'id' | 'questionnaire' | 'role'>): FriendEntity {
    const friend = {
      name,
      location,
      avatar,
      id: id ?? '',
      role: role,
      trainTypes: questionnaire?.trainType ?? [],
      trainingRequests: (questionnaire) ? (isUserQuestionnaire(questionnaire)) ? questionnaire.isReadyForTrain : questionnaire.individualTraining : false
    }
    return new FriendEntity(friend);
  }*/
}
