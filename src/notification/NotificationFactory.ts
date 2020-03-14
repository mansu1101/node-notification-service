import { NotificationType } from '../enums/Notification';
import { AwsSesService } from './AwsSesService';
import { Utility } from '../utility/Utility';
import { NodeMailer } from './NodeMailer';

export class NotificationFactory {
  public static getInstance(type: NotificationType, option: any): any {
    if (type === NotificationType.EMAIL) {
      if (Utility.isValidAwsSesConfig(option)) {
        return new AwsSesService(option);
      } else if (Utility.isValidNodeMailerConfig(option)) {
        return new NodeMailer(option);
      } else {
        console.info('Incorrect configuration supplied, Check documentation for more details\n' +
          'https://www.npmjs.com/package/node-notification-service/');
        return null;
      }
    }
  }
}
