import { NotificationService } from './notification/NotificationService';
import { NotificationType } from './enums/Notification';

export class Notification {
  notification: NotificationService;

  constructor(option: any) {
    this.notification = new NotificationService(option);
  }

  public async sendEmail(emailDetails: object) {
    await this.notification.send(NotificationType.EMAIL, emailDetails);
  }
  public async sendSMS(smsDetails: object) {
    return "Implementation coming soon!!!"
    //await this.notification.sendSMS(NotificationType.SMS, smsDetails);
  }
}
