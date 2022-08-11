/**
 * Usage example:
const sqs = new SQS();
const response = await sqs.send(params);
 */

const fs = require("fs");

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const sqsClient = new AWS.SQS({
  apiVersion: "2012-11-05",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3Client = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

class SQS {
  async send(params) {
    return sqsClient.sendMessage(params).promise();
  }

  sendAsync(params, cb) {
    sqsClient.sendMessage(params, cb);
  }
}

//  https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
/** Example:
 * upload({
 *  bucketName: "website-general-assets",
 *  originalFileName: "README.md",
 *  targetFileName: "inspector/backup/README.md"
 * })
 */
class S3 {
  upload(
    { bucketName, originalFileName, targetFileName, ACL = "public-read" },
    callback
  ) {
    const fileContent = fs.readFileSync(originalFileName);

    s3Client.upload(
      { Bucket: bucketName, Key: targetFileName, Body: fileContent, ACL },
      function (err, data) {
        console.log(`## [AWS] S3 Upload response received ##`);
        if (err) {
          console.error(`> err: ${JSON.stringify(err, null, 2)}`);
        } else {
          console.log(`> data: ${JSON.stringify(data, null, 2)}`);
        }

        console.log(`## [AWS] onComplete ##`);
        if (err) {
          console.error(`> Error: ${JSON.stringify(err, null, 2)}`);
        } else {
          console.log(`> Success: ${JSON.stringify(data, null, 2)}`);
        }

        if (callback) {
          callback(err, data);
        }
      }
    );
  }
}

module.exports = {
  SQS,
  S3,
};
