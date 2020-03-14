import { NotificationService } from './src/notification/NotificationService';
import { NotificationType } from './src/enums/Notification';
import { EmailRequest } from './src/models/EmailRequest';
import { SMSRequest } from './src/models/SMSRequest';

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
