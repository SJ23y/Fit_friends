import { Entity, StorableEntity, TrainingBalance } from "@backend/shared-core"

export class TrainingBalanceEntity extends Entity implements StorableEntity<TrainingBalance> {
  trainingId: string;
  userId: string;
  trainingCount: number;

  constructor(balance?: TrainingBalance) {
    super();

    this.populate(balance)
  }

  private populate(balance?: TrainingBalance) {
    if (balance) {
      this.trainingId = balance.trainingId;
      this.userId = balance.userId;
      this.trainingCount = balance.trainingCount;
    }
  }

  public toPOJO(): TrainingBalance {
    return {
      trainingId: this.trainingId,
      userId: this.userId,
      trainingCount: this.trainingCount
    }
  }

}
