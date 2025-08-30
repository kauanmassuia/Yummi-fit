import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const schema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  MONGODB_URI: Joi.string().uri().required(),
  META_WA_VERIFY_TOKEN: Joi.string().required(),
  META_WA_ACCESS_TOKEN: Joi.string().required(),
  META_WA_PHONE_NUMBER_ID: Joi.string().required(),
  META_WA_APP_ID: Joi.string().required(),
  META_WA_APP_SECRET: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().required(),
  CORS_ORIGIN: Joi.string().default('*'),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(60000),
  RATE_LIMIT_MAX: Joi.number().default(120)
}).unknown();

const { value, error } = schema.validate(process.env, { abortEarly: false });

if (error) {
  // mostrar quais envs faltam
  console.error('Env validation error', error.details.map(d => d.message));
  process.exit(1);
}

export const env = value;
