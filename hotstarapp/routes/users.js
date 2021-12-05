var express = require('express');
var AWS = require('aws-sdk');
// Set the region 
console.log("Region: ", process.env.AWS_REGION);

AWS.config.update({region: process.env.AWS_REGION});

// Create CloudWatch service object
var cw = new AWS.CloudWatch();

// Create parameters JSON for putMetricData
function createMetricData(value) {
  var params = {
    MetricData: [
      {
        MetricName: 'USERS_LOGGED',
  /*      Dimensions: [
          {
            Name: 'UNIQUE_PAGES',
            Value: 'URLS'
          },
        ],
  */
        Unit: 'Count',
        Value: value
      },
    ],
    Namespace: 'SITE/TRAFFIC'
  };

  return params;
}

var router = express.Router();

router.get('/login', function(req, res, next) {
    cw.putMetricData(createMetricData(1.0), function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", JSON.stringify(data));
      }
    });
});

router.get('/logout', function(req, res, next) {
    cw.putMetricData(createMetricData(-1.0), function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", JSON.stringify(data));
      }
    });
});

module.exports = router;
