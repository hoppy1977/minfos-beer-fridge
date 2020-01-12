'use strict';

var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});

module.exports.submitTemperatures = async event => {
  
  //console.log(JSON.stringify(event));

  console.log("xxx");

  var body = JSON.parse(event.body);
  var beerTemperature = body.beerTemperature;
  console.log(beerTemperature);
  var roomTemperature = body.roomTemperature;
  console.log(roomTemperature);
  var fridgeTemperature = body.fridgeTemperature;
  console.log(fridgeTemperature);

  console.log("yyy");

  var currentTimeStamp = new Date();
  var date
    = currentTimeStamp.getFullYear() + '-'
    + currentTimeStamp.getMonth() + 1 + '-'
    + currentTimeStamp.getDate();
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  var params = {
    TableName: 'MBF5',
    Item: {
      'Date' : {S: date},
      'TimeStamp' : {S: currentTimeStamp.toISOString()},
    }
  };
  if(beerTemperature) {
    params.Item.BeerTemperature = {S: beerTemperature};
  }
  if(roomTemperature) {
    params.Item.RoomTemperature = {S: roomTemperature};
  }
  if(fridgeTemperature) {
    params.Item.FridgeTemperature = {S: fridgeTemperature};
  }

  await ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
    else {
      console.log("Success", data);
    }
  }).promise();

  console.log("zzz");

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
