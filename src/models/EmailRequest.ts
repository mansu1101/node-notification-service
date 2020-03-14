export type EmailRequest = {
  to: string;
  message: string;
  subject: string;
  htmlText?: string;
};
