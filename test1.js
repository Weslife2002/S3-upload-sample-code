const {
  S3Client,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const axios = require('axios');
const fs = require('fs').promises;
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const { AWS: { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } } = require('./config');

async function test() {
  try {

  const imagePath = './test.jpg';
  const imageData = await fs.readFile(imagePath);

  const url = "https://sda-assignment.s3.us-east-1.amazonaws.com/games/fifa6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASXFTJTWEDJ7SE35O%2F20231112%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231112T182358Z&X-Amz-Expires=30&X-Amz-Signature=da1cb5c1627971c0fc1b47f4652735ac8283f6c8821144fd9a329d710152d666&X-Amz-SignedHeaders=host&x-id=PutObject";
  
  const response = await axios.put(url, imageData);
  console.log({ status: response.status });
  } catch (error) {
    console.log('ERROR :::', error);
  }
}

test();
