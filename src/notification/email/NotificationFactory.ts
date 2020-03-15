import { NotificationType } from '../../enums/Notification';
import { AwsSesService } from './AwsSesService';
import { NexmoSMSNotification } from '../sms/NexmoSMSNotification';
import { TwilioSMSNotification } from '../sms/TwilioSMSNotification';
import { Utility } from '../../utility/Utility';
import { NodeMailer } from './NodeMailer';

export class NotificationFactory {
  public static getInstance(type: NotificationType, option: any): any {
    if (type === NotificationType.EMAIL) {
      if (Utility.isValidAwsSesConfig(option)) {
        return new AwsSesService(option);
      } else if (Utility.isValidNodeMailerConfig(option)) {
        return new NodeMailer(option);
      } else {
        console.info(
          '-------------> Incorrect configuration supplied, Check logs for detail or follow below documentation for more details\n' +
            'https://www.npmjs.com/package/node-notification-service/ \n\n',
        );
        return null;
      }
    } else if (type === NotificationType.SMS) {
      if (Utility.isValidNexmoConfig(option)) {
        return new NexmoSMSNotification(option);
      } else if (Utility.isValidTwilioConfig(option)) {
        return new TwilioSMSNotification(option);
      } else {
        console.info(
          ' -------------> Incorrect configuration supplied, Check logs for detail or follow documentation for more details\n' +
            'https://www.npmjs.com/package/node-notification-service/ \n\n',
        );
        return null;
      }
    }
  }
}
