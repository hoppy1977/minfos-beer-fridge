'use strict';

var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});

module.exports.submitTemperatures = async event => {
  
  var currentTimeStamp = new Date();
  var date
    = currentTimeStamp.getUTCFullYear() + '-'
    + currentTimeStamp.getUTCMonth() + 1 + '-'
    + currentTimeStamp.getUTCDate();
  var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  var params = {
    TableName: 'MBF',
    Item: {
      'Date' : {S: date},
      'TimeStamp' : {S: currentTimeStamp.toISOString()},
    }
  };

  // Parse the temperatures out of the event
  var body = JSON.parse(event.body);

  var beerTemperature = body.beerTemperature;
  console.log("Beer temperature: " + beerTemperature);
  if(beerTemperature) {
    params.Item.BeerTemperature = {S: beerTemperature};
  }

  var roomTemperature = body.roomTemperature;
  console.log("Room temperature: " + roomTemperature);
  if(roomTemperature) {
    params.Item.RoomTemperature = {S: roomTemperature};
  }

  var fridgeTemperature = body.fridgeTemperature;
  console.log("Fridge temperature: " + fridgeTemperature);
  if(fridgeTemperature) {
    params.Item.FridgeTemperature = {S: fridgeTemperature};
  }

  // Write the data to the database
  return await ddb.putItem(params)
    .promise()
    .then(function(data) {
      console.log("Success! Temperatures were submitted successfully!", data);
    
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Success! Temperatures were submitted successfully!',
            input: event,
          },
          null,
          2
        ),
      };
    })
    .catch(function(err) {
      console.log("Error! A problem occured when submitting temperatures.", err);

      return {
        statusCode: 500,
        body: JSON.stringify(
          {
            message: 'Error! A problem occured when submitting temperatures.',
            input: event,
          },
          null,
          2
        ),
      };
    });
};
