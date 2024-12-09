import { Entity, Friend, Role, StorableEntity } from "@backend/shared-core";


export class FriendEntity extends Entity implements StorableEntity<Friend> {
  public name: string;
  public location: string;
  public trainTypes: string[];
  public avatar: string;
  public role: Role;
  public trainingRequests?: boolean;

  constructor(user?: Friend) {
    super();
    this.populate(user);
  }

  public populate(user?: Friend): void {
    if (user) {
      this.id = user.id ?? '';
      this.name = user.name;
      this.role = user.role;
      this.location = user.location;
      this.trainTypes = user.trainTypes ?? [];
      this.avatar = user.avatar;
      this.trainingRequests = user.trainingRequests;
    }
  }

  public toPOJO(): Friend {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      trainTypes: this.trainTypes,
      avatar: this.avatar,
      role: this.role,
      trainingRequests: this.trainingRequests ?? false
    }
  }
}
