import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export const uploadPhoto = async (file: any) => {
  const { createReadStream, filename } = await file;
  const { Location } = await new S3()
    .upload({
      Body: createReadStream(),
      Bucket: "instaclone-jw",
      Key: `${Date.now()}-${filename}`,
      ACL: "public-read",
    })
    .promise();
  return Location;
};
