
export interface Subscription  {
  subscribeById: string;
  subscribeByName: string;
  subscribeByEmail: string;
  subscribeToId: string;
  subscribeToName:  string;
  createdAt?:  Date;
  updatedAt?:  Date;
  lastEmail:  Date;
}
