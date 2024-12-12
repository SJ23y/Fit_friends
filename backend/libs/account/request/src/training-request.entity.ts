import { Entity, RequestForTraining, RequestStatus, User, StorableEntity } from "@backend/shared-core";

export class TrainingRequestEntity extends Entity implements StorableEntity<RequestForTraining> {
  public reciever: User;
  public recieverId: string;
  public sender: User;
  public senderId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public status: RequestStatus;

  constructor(request?: RequestForTraining) {
    super();
    this.populate(request);
  }

  public populate(request?: RequestForTraining): void {
    if (request) {
      this.reciever = request.reciever;
      this.sender = request.sender;
      this.recieverId = request.recieverId;
      this.senderId = request.senderId;
      this.createdAt = request.createdAt;
      this.updatedAt = request.updatedAt;
      this.status = request.status;
    }
  }

  public toPOJO(): RequestForTraining {
    return {
      reciever: this.reciever,
      recieverId: this.recieverId,
      sender: this.sender,
      senderId: this.senderId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status: this.status,
    }
  }
}
