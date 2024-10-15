export type ErrorDeatails = {
  property: string,
  value: string,
  messages: string[];
}

export type DetailMessageType = {
  statusCode: number;
  error: string;
  message: string[] | string;
};
