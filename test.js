const S3 = require('aws-sdk/clients/s3');
const axios = require('axios');
const fs = require('fs').promises;

const { AWS: { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } } = require('./config');

async function test() {
  try {
    const s3 = new S3({
      apiVersion: '2006-03-01',
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
      signatureVersion: 'v4',
    });

    // Set the expiration time for the pre-signed URL (in seconds)
    const objectKey = 'test-folder/test-image.jpg';
    const expiresIn = 3600; // 1 hour

    const params = {
      Bucket: BUCKET_NAME,
      Key: objectKey,
      Expires: expiresIn,
      ContentType: 'image/jpg',
    };
    const url = await s3.getSignedUrl('putObject', params);

    const imagePath = './test.jpg';
    const imageData = await fs.readFile(imagePath);

    const response = await axios.put(url, imageData);
    console.log({ status: response.status });
  } catch (error) {
    console.log('ERROR :::', error);
  }
}

test();
