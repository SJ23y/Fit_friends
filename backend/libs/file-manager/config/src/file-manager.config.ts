import * as Joi from 'joi';
import { registerAs } from '@nestjs/config'

export interface FileManagerConfig  {
  uploadsDirectory: string;
  staticDirectory: string;
}

const validationSchema = Joi.object({
  staticDirectory: Joi.string().required(),
  uploadsDirectory: Joi.string().required()
})

function validateConfig(config: FileManagerConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error(`[FileManager config validation error]: ${error.message}`);
  }
}

function getConfig(): FileManagerConfig {
  const config: FileManagerConfig = {
    uploadsDirectory: process.env['UPLOADS_DIRECTORY_PATH'] ?? '',
    staticDirectory: process.env['STATIC_DIRECTORY_PATH'] ?? '',

  }

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
