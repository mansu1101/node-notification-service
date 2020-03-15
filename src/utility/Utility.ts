import { NodeMailerConfigRequest } from '../models/NodeMailerConfigRequest';

export class Utility {
  public static isValidAwsSesConfig(option: any): boolean {
    return option.aws_ses && option.fromEmailAddress && option.region;
  }

  public static isValidNodeMailerConfig(option: any): boolean {
    return option.service && option.host && option.port && option.auth.user && option.auth.password;
  }

  public static isValidNexmoConfig(option: any): boolean {
    if (!option.services.nexmo && option.apiKey && option.apiSecret) {
      console.info(' -------------> Invalid configure option passed, set {services.nexmo: true}\n' +
        'follow documentation for more details \n https://www.npmjs.com/package/node-notification-service/');
      return false;
    }
    if (option.services.nexmo && !option.apiKey && option.apiSecret) {
      console.info('Invalid configure option passed, set {apiKey: \'your nexmo apiKey\'}\n' +
        'follow documentation for more details \n https://www.npmjs.com/package/node-notification-service/');
      return false;
    }
    if (option.services.nexmo && option.apiKey && !option.apiSecret) {
      console.info('Invalid configure option passed, set {apiSecret: \'your nexmo apiSecret \'}\n' +
        'follow documentation for more details \n https://www.npmjs.com/package/node-notification-service/');
      return false;
    }
    return option.services.nexmo && option.apiKey && option.apiSecret;
  }

  public static isValidTwilioConfig(option: any): boolean {
    if (!option.services.twilio && option.accountSid && option.authToken) {
      console.info(' -------------> Invalid configure option passed, set {services.twilio: true}\n' +
        'follow documentation for more details \n https://www.npmjs.com/package/node-notification-service/');
      return false;
    }
    if (option.services.twilio && !option.accountSid && option.authToken) {
      console.info('Invalid configure option passed, set {accountSid: \'your twilio accountSid\'}\n' +
        'follow documentation for more details \n https://www.npmjs.com/package/node-notification-service/');
      return false;
    }
    if (option.services.twilio && option.accountSid && !option.authToken) {
      console.info('Invalid configure option passed, set {authToken: \'your twilio authToken \'}\n' +
        'follow documentation for more details \n https://www.npmjs.com/package/node-notification-service/');
      return false;
    }
    return option.services.twilio && option.accountSid && option.authToken;
  }

  public static isValidAws_snsConfig(option: any): boolean {
    return option.services.aws_sns;
  }
}
