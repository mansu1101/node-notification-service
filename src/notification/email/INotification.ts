import { EmailRequest } from '../../models/EmailRequest';

export interface INotification {
  send(emailRequest: EmailRequest): Promise<any>;
}
