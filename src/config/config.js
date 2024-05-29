const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    S3_BUCKET_NAME: Joi.string().required().description('S3 Bucket Name'),
    S3_BUCKET_REGION: Joi.string().required().description('S3 Bucket Region'),
    S3_BUCKET_ACCESS_KEY_ID: Joi.string().required().description('S3 Bucket Access Key ID'),
    S3_BUCKET_SECRET_ACCESS_KEY: Joi.string().required().description('S3 Bucket Secret Access Key'),
    TWILIO_ACCOUNT_SID: Joi.string().required().description('Twilio Account SID'),
    TWILIO_AUTH_TOKEN: Joi.string().required().description('Twilio Auth Token'),
    TWILIO_SERVICES_ID: Joi.string().required().description('Twilio Services ID'),
    TWILIO_PHONE_NUMBER: Joi.string().required().description('Twilio Phone Number'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  s3: {
    bucketName: envVars.S3_BUCKET_NAME,
    bucketRegion: envVars.S3_BUCKET_REGION,
    bucketAccessKeyId: envVars.S3_BUCKET_ACCESS_KEY_ID,
    bucketSecretAccessKey: envVars.S3_BUCKET_SECRET_ACCESS_KEY,
  },
  twilio: {
    accountSid: envVars.TWILIO_ACCOUNT_SID,
    authToken: envVars.TWILIO_AUTH_TOKEN,
    servicesId: envVars.TWILIO_SERVICES_ID,
    phoneNumner: envVars.TWILIO_PHONE_NUMBER,
  },
};
