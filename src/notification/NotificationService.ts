import { NotificationType } from '../enums/Notification';
import { NotificationFactory } from './NotificationFactory';

export class NotificationService {
  private option: any;
  constructor(option: any) {
    this.option = option;
  }

  public async send(notificationType: NotificationType, details: any) {
    await NotificationFactory.getInstance(notificationType, this.option).send(details);
  }
  public async sendSMS(notificationType: NotificationType, details: any) {
    await NotificationFactory.getInstance(notificationType, this.option).send(details.mobileNumber, details);
  }
}
