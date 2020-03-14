# Node Notification Service

A simple npm module which help to send Emails, SMS.

## Motivation
As part of nodejs project we wanted to send emails and sms to our customers. The major problem we face it to configuring the email 
settings and then sending it.This service uses AWS-SES module and node-mailer module to send the emails.

## Quick Start
Check out the [quick start example][quick-example] in `./examples/`. 
There are a number of other examples in [`./examples/*.js`][examples].
Don't see an example you think should be there? Submit a pull request
to add it!

## Usage
The recommended way to use `node-notification-service` is to send email and messages. The
simplest way to do this is using `notifyService.send({})`:
Below example we are configuring AWS-SES service to send email.

``` js
const {Notification} = require('node-notification-service');
let notifyService = new Notification({ aws_ses: true, fromEmailAddress: "your aws-ses configured email address", region: "your ses service region"})
let emailResonse = await notifyService.sendEmail({
                    to: ["emaild whom you want to send the email"],
                    subject: "Your email subject",
                    message: "your email body",
                    html: "<h1>html can be binded here.</h1>"
                   });
console.log("Email sent success by SES service!!");
```
##Setup AWS-SES service account
Follow this link to setup the new account https://www.youtube.com/watch?v=Ps0vpgMyJm4 , if you already have aws console window and follow the video for activating 
aws-ses service.Once you setup ses account we need verified email address for sending email and also we need region. 

Below example we are configuring node-mailer to send email.

``` js
const {Notification} = require('node-notification-service');
let notifyService = new Notification({    service: 'gmail',
                                          host: 'smtp.gmail.com',
                                          secure: true,
                                          port: 465,
                                          auth: {
                                            user: 'senderemailAddress',
                                            password: 'senderPassword',
                                          }
                                        })
let emailResponse = await notifyService.sendEmail({
                    to: ["emaild whom you want to send the email"],
                    subject: "Your email subject",
                    message: "your email body",
                    html: "<h1>html can be binded here.</h1>"
                   });
console.log("Email sent by node-Mailer success!!");
```

##Quick help for node-mailer service
if you are using your own gmail or any other service provider for sending email, you might get this error.
**Error: Invalid login: 535-5.7.8 Username and Password not accepted**
To resolve the above error goto below link and give full access.(Allow less secure apps: ON) 
https://myaccount.google.com/lesssecureapps?pli=1
Then try again running your application

##More examples
Send email to multiple recipients using AWS-SES service.
 
``` js
   const {Notification} = require("node-notification-service");
  let mailer = new Notification({ aws_ses: true, fromEmailAddress: "formEmail address", region: "ap-south-1"});
  let emailResponse = mailer.sendEmail({
    to: ['mailId-1@demo.com', 'mailId-2@demo.com'],
    cc: ['mailId-3@demo.com'],
    message: 'testing multiple mail sending proccess',
    subject: 'multip mail sender',
    html: "Hi Dear User,<br> <br>Greeting!<br>Here is your OTP for password Reset <br><b>OTP: " + 123456 + "</b><br><br> Thanks! <br>Team InTime-Tec",
  });
  console.log('email send by aws-ses mailer');
```
Send email to multiple recipients using Node-Mailer service.

``` js
  const {Notification} = require("node-notification-service");
  let mailer = new Notification({
                                    service: 'gmail',
                                    host: 'smtp.gmail.com',
                                    secure: true,
                                    port: 465,
                                    auth: {
                                      user: 'senderemailAddress',
                                      password: 'senderPassword',
                                    },
                                  });
  let emailResponse = mailer.sendEmail({
    to: ['mailId-1@demo.com', 'mailId-2@demo.com'],
    cc: ['mailId-3@demo.com'],
    message: 'testing multiple mail sending proccess',
    subject: 'multip mail sender',
    html: "Hi Dear User,<br> <br>Greeting!<br>Here is your OTP for password Reset <br><b>OTP: " + 123456 + "</b><br><br> Thanks! <br>Team InTime-Tec",
  });
  console.log('email send by node mailer');
```