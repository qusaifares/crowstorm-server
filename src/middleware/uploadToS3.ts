import aws from 'aws-sdk';
import { Base64 } from 'aws-sdk/clients/ecr';

import {
  base64FileFormat,
  base64ImageType,
  base64ToBuffer
} from '../helpers/base64';

const {
  AWS_BUCKET_NAME = 'crowstorm',
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} = process.env;

aws.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
  region: AWS_REGION
});

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

export const uploadToS3 = async (
  data: Base64,
  id: string,
  folderName: string = ''
) => {
  const allowedFormats = ['png', 'jpg', 'jpeg'];
  const imageType = base64ImageType(data);
  const fileFormat = base64FileFormat(data);
  const buffer = base64ToBuffer(data);

  if (!data) return;
  if (!imageType) return;
  if (!allowedFormats.includes(imageType)) return;
  // [id]_[timestamp]_001.jpg
  const name = `${
    folderName ? folderName + '/' : ''
  }${id}_${Date.now().toString()}_${Math.floor(
    Math.random() * 1000
  )}.${imageType}`;
  try {
    const res = await s3
      .upload({
        Bucket: AWS_BUCKET_NAME,
        ACL: 'public-read',
        Key: name,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: fileFormat
      })
      .promise();
    return res.Location;
  } catch (error) {
    console.log(error);
  }
};

export default s3;
