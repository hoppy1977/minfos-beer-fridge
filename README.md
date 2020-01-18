# minfos-beer-fridge
## Overview
The serverless back end for the Minfos Beer Fridge IoT system.<br>
The code for the Arduino client device can be found [here](https://github.com/hoppy1977/minfos-beer-fridge-client).

## Background
The MBF system was developed to augment the old, clapped out beer fridge at Minfos with internet connectivity.<br>
The system is comprised of:
1. An Arduino hardware client which measures the temperature of the room the fridge is in, the fridge temperature iteself, and of course the temperature of the beer in the fridge, and<br>
2. This serverless stack, which is deployed in AWS and receives the beer telemetry from the hardware client.

## Prerequsites
1. You need an AWS account.
2. You have Node.JS installed.

## Setup
First clone the repo:
```
git clone https://github.com/hoppy1977/minfos-beer-fridge.git
```

Install the NPM packages:
```
npm install
```
Now you just need to put your credentials in the AWS parameter store:
1. Login to AWS
2. Go to the 'Systems Manager' service
3. Go to 'Parameter Store'
4. Create the following parameters:

| Parameter Name                                  | Value         |
| ----------------------------------------------- | ------------- |
| /MinfosBeerFridge/ApiKeys/Client                | The API key that is used to authenicate the device that is submitting the temperatures.<br/>If you don't specify a value one will be generated for you when you deploy the stack. It is suggested you note the value at that point and store it in SSM.<br>It is important to note that whatever API key is used will also have to be uploaded to the hardware device. |
| /MinfosBeerFridge/PhoneNumber                   | The mobile phone number that you  want to receive any SMS alert messages on.<br/>Must be in [E.164](https://en.wikipedia.org/wiki/E.164) format. |

# Deployment
You're almost done! Now you just need to deploy to the cloud:
```
serverless deploy
```