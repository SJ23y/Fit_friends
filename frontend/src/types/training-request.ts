import { RequestStatus } from "../consts";

export type TrainingRequest = {
  senderId: string;
  recieverId: string;
  status: RequestStatus;
}

export type RequestData = {
  senderId: string;
  recieverId: string;
  status: RequestStatus;
  cb: () => void
}
