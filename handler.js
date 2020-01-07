'use strict';

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
