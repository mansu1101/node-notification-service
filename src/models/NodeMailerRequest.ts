export type NodeMailerEmailRequest = {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  attachments?: any[];
  html?: string;
  subject: string;
  text?: string;
};
