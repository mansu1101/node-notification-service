require('dotenv').config({ path: __dirname + '/.env' });
import { ISMSNotification } from './ISMSNotification';
import { SMSRequest } from '../../models/SMSRequest';

const twilio = require('twilio');

export class TwilioSMSNotification implements ISMSNotification {
  private _option: any;
  private smsSender: any;

  constructor(option: any) {
    this._option = option;
    this.smsSender = twilio(option.accountSid, option.authToken);
  }

  async send(details: SMSRequest) {
    return new Promise((reject, resolve) => {
      try {
        let from = details.from || this._option.from;
        this.smsSender.messages.create({
          body: details.message,
          to: details.to,
          from: from,
        }, (err: any, responseData: any) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(responseData);
          }
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }
}