export type SMSRequest = {
  to: string;
  from?: string,
  message: string;
  subject?: string;
  services:{
    nexmo?: boolean,
    twilio?: boolean,
    aws_sns?: boolean
  }
};
