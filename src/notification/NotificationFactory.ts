import {NotificationType} from "../enums/Notification";
import {AwsSesService} from "./AwsSesService";

export class NotificationFactory {

  public static getInstance(type: NotificationType, option: any): any {
    if (type === NotificationType.EMAIL) {
      if (option.aws_ses) {
        return new AwsSesService(option);
      }
    }
  }
}