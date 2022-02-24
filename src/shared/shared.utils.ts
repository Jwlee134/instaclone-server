import AWS from "aws-sdk/global";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});
