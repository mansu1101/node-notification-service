import { INotification } from './INotification';
import * as nodeMailer from 'nodemailer';
import { NodeMailerEmailRequest } from '../models/NodeMailerRequest';
import { NodeMailerConfigRequest } from '../models/NodeMailerConfigRequest';
import { EmailRequest } from '../models/EmailRequest';

export class NodeMailer implements INotification {
  private transporter: any;
  private _option: NodeMailerConfigRequest;

  private createTransport(): any {
    return nodeMailer.createTransport({
      service: this._option.service,
      host: this._option.host,
      secure: this._option.secure,
      port: this._option.port,
      auth: {
        user: this._option.auth.user,
        pass: this._option.auth.password,
      },
    });
  }

  constructor(option: NodeMailerConfigRequest) {
    this._option = option;
    this.transporter = this.createTransport();
  }

  configure(option: NodeMailerEmailRequest) {
    return {
      from: option.from,
      to: option.to,
      cc: option.cc,
      bcc: option.bcc,
      subject: option.subject,
      text: option.text,
      htmlText: option.html,
      attachments: option.attachments,
    };
  }

  send(emailRequest: EmailRequest) {
    console.log('request :', emailRequest);
    let request: NodeMailerEmailRequest = this.configure({
      from: this._option.auth.user,
      to: emailRequest.to,
      cc: emailRequest.cc,
      bcc: emailRequest.bcc,
      subject: emailRequest.subject,
      attachments: emailRequest.attachments,
    });
    if (emailRequest.html) {
      request.html = emailRequest.html;
    } else {
      request.text = emailRequest.message;
    }
    return new Promise(async (resolve, reject) => {
      try {
        this.transporter.sendMail(request, (err: any, res: any) => {
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
