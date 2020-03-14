import { NotificationService } from './notification/NotificationService';
import { NotificationType } from './enums/Notification';
import { EmailRequest } from './models/EmailRequest';
import { SMSRequest } from './models/SMSRequest';

export class Notification {
  notification: NotificationService;

  constructor(option: any) {
    this.notification = new NotificationService(option);
  }

  public async sendEmail(emailDetails: EmailRequest) {
    await this.notification.send(NotificationType.EMAIL, emailDetails);
  }
  public async sendSMS(smsDetails: SMSRequest) {
    return 'Implementation coming soon!!!';
    //await this.notification.sendSMS(NotificationType.SMS, smsDetails);
  }
}