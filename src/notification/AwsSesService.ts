import { INotification } from './INotification';

let AWS = require('aws-sdk');
import { SesRequest } from '../models/SesRequest';
import { EmailRequest } from '../models/EmailRequest';
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
    this.ses = new AWS.SES({ apiVersion: '2010-12-01' });
    console.log('AWS SES Object Created Successfully!');
  }

  private verifyEmailAddress(emailId: string, callback: Function) {
    AWS.verifyEmailAddress({ EmailAddress: emailId }, callback);
  }

  async send(emailRequest: EmailRequest) {
    let ses_mail: any;
    ses_mail = ses_mail + 'To: ' + emailRequest.to + '\n';
    ses_mail = ses_mail + 'Subject:' + emailRequest.subject + '\n';
    ses_mail = ses_mail + 'MIME-Version: 1.0\n';
    ses_mail = ses_mail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
    ses_mail = ses_mail + '--NextPart\n';
    ses_mail = ses_mail + 'Content-Type: text/html; charset=us-ascii\n\n';
    if (emailRequest.html) {
      ses_mail = ses_mail + emailRequest.html;
    } else {
      ses_mail = ses_mail + emailRequest.message;
    }

    return new Promise(async (resolve, reject) => {
      try {
        /*let params = {
          RawMessage: { Data: new Buffer(ses_mail) },
          Destinations:[ /!* required *!/
            {
              Destination: { /!* required *!/
                CcAddresses: emailRequest.cc,
                ToAddresses: emailRequest.to
              },
            }
          ],
          Source: 'AWS SES SERVICE <' + this.senderEmail + ">'",
        };
        //we can call above verify method to check if domain specific email send is there or not.
        this.ses.sendRawEmail(params, (err: any, res: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });*/
        let body: any;
        if (emailRequest.html) {
          body = {
            Html: {
              Charset: 'UTF-8',
              Data: emailRequest.html,
            },
          };
        } else {
          body = {
            Text: {
              Charset: 'UTF-8',
              Data: emailRequest.message,
            },
          };
        }
        let params = {
          Destination: {
            /* required */
            CcAddresses: emailRequest.cc,
            ToAddresses: emailRequest.to,
          },
          Message: {
            /* required */
            Body: body,
            Subject: {
              Charset: 'UTF-8',
              Data: emailRequest.subject,
            },
          },
          Source: 'AWS SES SERVICE <' + this.senderEmail + ">'" /* required */,
        };

        // Create the promise and SES service object
        var sendPromise = this.ses.sendEmail(params).promise();
        sendPromise
          .then(function(data: any) {
            console.log(data.MessageId);
            resolve(data.MessageId);
          })
          .catch(function(err: any) {
            console.error(err, err.stack);
            reject(err.stack);
          });
      } catch (e) {
        reject(e);
      }
    });
  }
}
