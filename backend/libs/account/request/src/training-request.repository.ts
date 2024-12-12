import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { Injectable } from '@nestjs/common';
import { Request } from '@prisma/client';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestFactory } from './training-request.factory';

@Injectable()
export class TrainingRequestRepository extends BasePostgresRepository<TrainingRequestEntity, Request> {
  constructor(
    entityFactory: TrainingRequestFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory);
  }

  public async save(recieverId: string, senderId: string, status: string): Promise<void> {
    await this.client.request.upsert({
      where: {
        recieverId_senderId: {
          recieverId,
          senderId
        }
      },
      create: {
        reciever: {
          connect: {
            id: recieverId
          }
        },
        sender: {
          connect: {
            id: senderId
          }
        },
        status: status
      },
      update: {
        reciever: undefined,
        sender: undefined,
        status: status
      }
    });
  }

  public async getRequest(recieverId: string, senderId: string): Promise<Request | null> {
    const existedRequest = await this.client.request.findFirst({
      where: {
        OR: [
          {
            recieverId,
            senderId
          },
          {
            senderId: recieverId,
            recieverId: senderId
          }
        ]
      }
    });
    return existedRequest;
  }
}
