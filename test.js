const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const axios = require('axios');
const fs = require('fs').promises;
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const { AWS: { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } } = require('./config');

async function test() {
  try {
    const s3 = new S3Client({
      apiVersion: '2006-03-01',
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
      region: REGION,
      signatureVersion: 'v4',
    });

    // Set the expiration time for the pre-signed URL (in seconds)
    const objectKey = 'test-folder/test-image.jpg';
    // const expiresIn = 3600; // 1 hour

    const localDate = new Date();

    // Get the UTC timestamp equivalent by subtracting the timezone offset
    const utcTimestamp = localDate.getTime() - localDate.getTimezoneOffset() * 60000 + 60000;

    // Create a new Date object using the UTC timestamp
    const utcDate = new Date(utcTimestamp);


    const params = {
      Bucket: BUCKET_NAME,
      Key: objectKey,
    };
    
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 30 });

    console.log({ url });
  } catch (error) {
    console.log('ERROR :::', error);
  }
}

test();
