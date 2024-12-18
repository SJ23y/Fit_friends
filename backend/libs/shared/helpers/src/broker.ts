import { ConfigService } from '@nestjs/config';
import { getRabbitMqConnectionString } from './common';

export function getRabbitMqOptions(optionsSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [{
        name: config.get<string>(`${optionsSpace}.rabbit.exchange`),
        type: 'direct'
        }
      ],
      uri: getRabbitMqConnectionString({
        user: config.get<string>(`${optionsSpace}.rabbit.user`),
        password: config.get<string>(`${optionsSpace}.rabbit.password`),
        host: config.get<string>(`${optionsSpace}.rabbit.host`),
        port: config.get<string>(`${optionsSpace}.rabbit.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
