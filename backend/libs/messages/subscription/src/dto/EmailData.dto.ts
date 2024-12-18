import { Subscription, Training } from "@backend/shared-core";

export class EmailDataDto {
  training: Training;
  subscriptions: Subscription[];
}
