import { PrismaClient } from "@prisma/client";
import { generateMockTraining } from "../mock-data/mock-trainings";
import { generateMockUser } from "../mock-data/mock-users";
import { genSalt, hash } from 'bcrypt';
import { generateMockPurchase } from "../mock-data/mock-purchases";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRanndomElement } from '../../../../helpers/src/common';
import { generateMockReview } from "../mock-data/mock-reviews";

export class DataGenerator {
  private trainingIds: string[] = [];
  private userIds: string[] = [];

  constructor(
    private readonly users: number,
    private readonly trainings: number,
    private readonly reviews: number,
    private readonly purchaces: number
  ) {}

  private async generateTrainings(client: PrismaClient) {
    for (let i=0; i < this.trainings; i++) {
      const training = await client.training.create({
        data: {
          ...generateMockTraining()
        }
      });
      this.trainingIds.push(training.id);
    };
    console.log(`${this.trainings} trainings was created`);
  }

  private async generateUsers(client: PrismaClient) {
    const salt = await genSalt(5);
    const passwordHash = await hash('password', salt);
    for (let i=0; i < this.users; i++) {
      const user = await client.user.create({
        data: {
          ...generateMockUser(),
          purchases: undefined,
          trainings: undefined,
          questionnaire: undefined,
          reviews: undefined,
          passwordHash
        }
      });
      this.userIds.push(user.id);
    };
    console.log(`${this.users} users was created`);
  }

  private async generatePurchases(client: PrismaClient) {
    for (let i=0; i < this.purchaces; i++) {
      const userId = getRanndomElement(this.userIds);
      const trainingId = getRanndomElement(this.trainingIds);
      const purchase = generateMockPurchase();
      Promise.all([
        client.purchase.create({
          data: {
            price: purchase.price,
            trainCount: purchase.trainCount,
            totalPrice: purchase.price * purchase.trainCount,
            paymentType: purchase.paymentType,
            type: purchase.type,
            user: {
              connect: {id: userId}
            },
            train: {
              connect: {id: trainingId}
            }
          }
        }),
        client.deposit.upsert({
          where: {
            userId_trainId: {
              userId: userId,
              trainId: trainingId
            }
          },
          create: {
            count: purchase.trainCount,
            trainId: trainingId,
            user: {
              connect: {id: userId}
            }
          },
          update: {
            count: {
              increment: purchase.trainCount
            }
          }
        })
      ])
    };
    console.log(`${this.purchaces} purchases was created`);
  }

  private async generateReviews(client: PrismaClient) {
    for (let i=0; i < this.reviews; i++) {
      const review = generateMockReview();
      await client.review.create({
        data: {
          rate: review.rate,
          content: review.content,
          author: {
            connect: {id: getRanndomElement(this.userIds)}
          },
          train: {
            connect: {id: getRanndomElement(this.trainingIds)}
          }
        }
      });
    };
    console.log(`${this.reviews} reviews was created`);
  }



  public async generate(client: PrismaClient) {
    await Promise.all([
      this.generateTrainings(client),
      this.generateUsers(client)
    ]);

    await Promise.all([
      this.generatePurchases(client),
      this.generateReviews(client)
    ]);
  }
}
