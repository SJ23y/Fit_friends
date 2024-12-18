import { registerAs } from '@nestjs/config'
import * as Joi from 'joi';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const DEFAULT_RABBIT_PORT = '5672';
const DEFAULT_SMTP_PORT = '25';
const DEFAULT_CLIENT_PORT = '5173';

export interface MessagesConfig {
  environment?: string,
  clientPort: number,
  rabbit: {
    host: string;
    port: number;
    user: string;
    password: string;
    exchange: string;
    queue: string;
  },
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  clientPort: Joi.number().port().default(DEFAULT_CLIENT_PORT),
  rabbit: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    exchange: Joi.string().required(),
    queue: Joi.string().required(),
  }),
  mail: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().default(DEFAULT_SMTP_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required()
  })
});

function validateConfig(config: MessagesConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error(`[Notify config validation error]: ${error.message}`);
  }
}

function getConfig(): MessagesConfig {
  const config: MessagesConfig = {
    environment: process.env.NODE_ENV,
    clientPort: parseInt(process.env.CLIENT_PORT ?? DEFAULT_CLIENT_PORT, 10),
    rabbit: {
      host: process.env.RABBIT_HOST,
      port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT, 10),
      user: process.env.RABBIT_USER,
      password: process.env.RABBIT_PASSWORD,
      queue: process.env.RABBIT_QUEUE,
      exchange: <string>process.env.RABBIT_EXCHANGE
    },
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(process.env.MAIL_SMTP_PORT ?? DEFAULT_SMTP_PORT, 10),
      user: process.env.MAIL_USER,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_FROM
    }
  }

  validateConfig(config);
  return config;
}

export default registerAs('messages', getConfig);
