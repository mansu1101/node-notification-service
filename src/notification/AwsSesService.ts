import { INotification } from './INotification';
let AWS = require('aws-sdk');
import { SesRequest } from '../models/SesRequest';
//let config = require("../config/config");

//Below lines are required in local testing with AWS-SES service, //to use this credentials we need to get the access kry from aws console
// and keep into local credentials file
//aws.config.update({region: "ap-south-1"});
//aws.config.credentials;
//let ses = new aws.SES();

export class AwsSesService implements INotification {
  senderEmail: string;
  ses: any;
  constructor(sesConfig: any) {
    this.senderEmail = sesConfig.fromEmailAddress;
    //TODO:comment below one when pusing the code
    AWS.config.credentials;
    AWS.config.update({ region: sesConfig.region });
    this.ses = new AWS.SES();
    console.log('AWS SES Object Created Successfully!');
  }
  private verifyEmailAddress(emailId: string, callback: Function) {
    AWS.verifyEmailAddress({ EmailAddress: emailId }, callback);
  }

  async send(emailId: string, body: any) {
    let ses_mail: any;
    ses_mail = ses_mail + 'To: ' + emailId + '\n';
    ses_mail = ses_mail + 'Subject:' + body.subject + '\n';
    ses_mail = ses_mail + 'MIME-Version: 1.0\n';
    ses_mail = ses_mail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
    ses_mail = ses_mail + '--NextPart\n';
    ses_mail = ses_mail + 'Content-Type: text/html; charset=us-ascii\n\n';
    if (body.htmlText) {
      ses_mail = ses_mail + body.htmlText;
    }

    return new Promise(async (resolve, reject) => {
      try {
        let params = {
          RawMessage: { Data: new Buffer(ses_mail) },
          Destinations: [emailId],
          Source: 'AWS SES SERVICE <' + this.senderEmail + ">'",
        };
        //we can call above verify method to check if domain specific email send is there or not.
        this.ses.sendRawEmail(params, (err: any, res: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
