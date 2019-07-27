const AWS = require('aws-sdk');
const request = require('request');
const env = require('./s3.config');

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.REGION,
});

const s3 = new AWS.S3();

const uploadImage = (url, fileName, callback) => {
  request({ url: url, encoding: null }, (err, res, body) => {
    if (err) {
      console.log('fail to request the image');
    } else {
      const param = {
        ACL: 'public-read',
        Bucket: 'gastrodamus-images',
        ContentType: res.headers['content-type'],
        Body: body,
        Key: fileName,
      };
      s3.putObject(param, (error, data) => {
        if (error) {
          console.log('fail to upload the image');
          callback(err);
        }
      });
    }
  });
};

for (let i = 0; i < 1000; i += 1) {
  const image = 'https://source.unsplash.com/600x400/?dish';
  uploadImage(image, `dish/${i + 1}.jpg`, (err, data) => {
    if (err) {
      console.log('error occured: ', err);
    }
  });
}
