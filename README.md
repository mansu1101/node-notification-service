# Node Notification Service

A simple npm module which help to send Emails, SMS.

## Motivation
As part of nodejs project we wanted to send emails and sms to our customers. The major problem we face it to configuring the email 
settings and then sending it.This service uses AWS-SES module and nodemailer module to send the emails.

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
let emailResonse = await notifyService.send({
                    to:"emaild whom you want to send the email",
                    subject: "Your email subject",
                    message: "your email body",
                    htmlText: "<h1>html can be binded here.</h1>"
                   });
console.log("Email sent success!!");
```

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
let emailResonse = await notifyService.send({
                    to:"emaild whom you want to send the email",
                    subject: "Your email subject",
                    message: "your email body",
                    htmlText: "<h1>html can be binded here.</h1>"
                   });
console.log("Email sent by node-Mailer success!!");