export type ErrorDeatails = {
  property: string,
  value: string,
  messages: string[];
}

export type DetailMessageType = {
  errorType: string;
  error: string;
  details: ErrorDeatails[]
};
