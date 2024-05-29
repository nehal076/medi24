const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/config');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

aws.config.update({
  secretAccessKey: config.s3.bucketSecretAccessKey,
  accessKeyId: config.s3.bucketAccessKeyId,
  region: config.s3.bucketRegion,
  signatureVersion: 'v4',
});

const s3 = new aws.S3();

const uploadImage = multer({
  storage: multerS3({
    s3,
    bucket: config.s3.bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${file.originalname}-${Date.now()}`);
    },
  }),
});

module.exports = { uploadImage };
