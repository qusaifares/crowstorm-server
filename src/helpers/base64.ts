import { Base64 } from 'aws-sdk/clients/ecr';

export const base64FileFormat = (base64File: Base64) => {
  return base64File.substring(
    base64File.indexOf('data:') + 5,
    base64File.indexOf(';base64')
  );
};

export const base64ImageType = (base64Image: Base64): string | undefined => {
  const prefix = base64Image?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
  if (prefix) {
    return prefix[0].split('/')[1];
  }
};

export const base64ToBuffer = (base64Image: Base64): Buffer => {
  const imageBuffer = Buffer.from(
    base64Image.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  return imageBuffer;
};
