import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '.env'),
});
import { NotificationService } from './notification/email/NotificationService';
import { NotificationType } from './enums/Notification';
import { EmailRequest } from './models/EmailRequest';
import { SMSRequest } from './models/SMSRequest';
import { Utility } from './utility/Utility';

//const testconfig = require('../test.json');

export class Notification {
  notification: NotificationService;
  private _option: any;

  constructor(option: any) {
    this._option = option;
    this.notification = new NotificationService(option);
  }

  public async sendEmail(emailDetails: EmailRequest) {
    await this.notification.send(NotificationType.EMAIL, emailDetails);
  }

  public async sendSMS(smsDetails: SMSRequest) {
    if (Utility.isValidNexmoConfig(this._option)) {
      await this.notification.sendSMS(NotificationType.SMS, smsDetails);
    } else if (Utility.isValidTwilioConfig(this._option)) {
      await this.notification.sendSMS(NotificationType.SMS, smsDetails);
    }
  }
}
