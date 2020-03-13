import { NotificationService } from './notification/NotificationService';
import { NotificationType } from './enums/Notification';

export class Index {
  notification: NotificationService;

  constructor(option: any) {
    this.notification = new NotificationService(option);
  }

  public async sendEmail(emailDetails: object) {
    await this.notification.send(NotificationType.EMAIL, emailDetails);
  }
}

async function testThisClass() {
  let obj = new Index( { aws_ses: true, fromEmailAddress: 'mansujoshi89@gmail.com', region: "ap-south-1"});
  let sentEmail = await obj.sendEmail({
    to: 'mansujoshi89@gmail.com',
    message: 'this is my message',
    subject: "Heading comes here",
    htmlText: "Hi Dear User,<br> <br>Greeting!<br>Here is your OTP for password Reset " + "<br><b>OTP: " + 123456 +
      "</b><br><br> Thanks! <br>Team InTime-Tec"
  });
  console.log('Email sent Successfully');
}
testThisClass();
