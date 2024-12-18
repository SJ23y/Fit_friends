export const SubscriptionValidationMessages =  {
  invalidUUID: "The id value should be valid UUID",
  invalidEmail: "The value isn't valid email",
  invalidName: "Name should be string with the length within 1-15 charactres"
} as const;


export const SubscriptionInfoMessages =  {
  Created: "Subscription was susseccfully created",
  Deleted: "Subscription was susseccfully deleted",
  Getted: "Get subscriptions by id",
  UserNotFound: 'Can not find the user',
  Unauthorized: 'Sign in to perform this action',
  Conflict: 'You not allowed to make subscription for other users',
  NoSubscription: 'You haven\'t subscribed to this user'
} as const;
