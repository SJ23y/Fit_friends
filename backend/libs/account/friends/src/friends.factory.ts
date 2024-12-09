import { AuthUser, EntityFactory, Friend } from "@backend/shared-core";
import { Injectable } from "@nestjs/common";
import { FriendEntity } from "./friends.entity";
import { isUserQuestionnaire } from "@backend/shared-helpers";

@Injectable()
export class FriendsFactory implements EntityFactory<FriendEntity> {
  public create(entityPlainData: Friend): FriendEntity {
    return new FriendEntity(entityPlainData);
  }

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
  }
}
