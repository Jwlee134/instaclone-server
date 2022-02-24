import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

const Bucket = "instaclone-jw";

export const uploadPhotoToS3 = async (file: any, folder?: string) => {
  const { createReadStream, filename } = await file;
  const { Location } = await new S3()
    .upload({
      Body: createReadStream(),
      Bucket,
      Key: `${folder}/${Date.now()}-${filename}`,
      ACL: "public-read",
    })
    .promise();
  return Location;
};

export const deletePhotoFromS3 = async (file: string) => {
  const nameArr = file.split("com/");
  await new S3()
    .deleteObject({ Bucket, Key: decodeURI(nameArr[nameArr.length - 1]) })
    .promise();
};
