import { ISMSNotification } from './ISMSNotification';
import { SMSRequest } from '../../models/SMSRequest';

require('dotenv').config({ path: __dirname + '/.env' });
const Nexmo = require('nexmo');

export class NexmoSMSNotification implements ISMSNotification {
  private _option: any;
  private smsSender: any;

  constructor(option: any) {
    this._option = option;
    this.smsSender = new Nexmo({
      apiKey: option.apiKey,
      apiSecret: option.apiSecret,
    });
  }

  async send(details: SMSRequest) {
    return new Promise((reject, resolve) => {
      try {
        let from = details.from || this._option.from;
        this.smsSender.message.sendSms(from, details.to, details.message, (err: any, responseData: any) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (responseData.messages[0]['status'] === '0') {
              resolve(responseData);
              console.log('Message sent successfully.');
            } else {
              reject(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              console.log(responseData.messages[0]);
            }
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
