export type EmailRequest = {
  from?: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  attachments?: any[];
  html?: string;
  subject: string;
  message: string;
};
