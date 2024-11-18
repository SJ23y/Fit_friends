import { PrismaClient, Training, User } from "@prisma/client";
import { generateMockTraining } from "../mock-data/mock-trainings";
import { generateMockUser } from "../mock-data/mock-users";
import { genSalt, hash } from 'bcrypt';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Role } from "../../../../core/src/index";
import { generateMockPurchase } from "../mock-data/mock-purchases";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRanndomElement } from '../../../../helpers/src/common';
import { generateMockReview } from "../mock-data/mock-reviews";
import { generateMockCoachQuestionnaire, generateMockUserQuestionnaire } from "../mock-data/mock-questionnaire";

export class DataGenerator {
  private createdTrainings: Training[] = [];
  private createdUsers: User[] = [];

  constructor(
    private readonly users: number,
    private readonly trainings: number,
    private readonly reviews: number,
    private readonly purchaces: number
  ) {}

  private async generateTrainings(client: PrismaClient) {
    const coachUsers = this.createdUsers.filter((user) => user.role === Role.COACH);
    for (let i=0; i < this.trainings; i++) {
      const coach = (coachUsers.length > 0) ? getRanndomElement(coachUsers) : getRanndomElement(this.createdUsers);
      const training = await client.training.create({
        data: {
          ...generateMockTraining(),
          coachId: undefined,
          coach: {
            connect: {
              id: coach.id
            }
          }
        }
      });
      this.createdTrainings.push(training);
    };
    console.log(`${this.trainings} trainings was created`);
  }

  private async generateUsers(client: PrismaClient) {
    const salt = await genSalt(5);
    const passwordHash = await hash('password', salt);
    for (let i=0; i < this.users; i++) {
      const mockUser = generateMockUser();
      const mockQuestionnaire = (mockUser.role === Role.USER) ? generateMockUserQuestionnaire() : generateMockCoachQuestionnaire();
      const coachUsers = this.createdUsers.filter((user) => user.role === Role.COACH);
      const user = await client.user.create({
        data: {
          ...mockUser,
          role: (coachUsers.length === 0) ? Role.COACH : mockUser.role,
          purchases: undefined,
          trainings: undefined,
          questionnaire: {
            create: {
              ...mockQuestionnaire

            }
          },
          reviews: undefined,
          passwordHash
        }
      });
      this.createdUsers.push(user);
    };
    console.log(`${this.users} users was created`);
  }

  private async generatePurchases(client: PrismaClient) {
    for (let i=0; i < this.purchaces; i++) {
      const user = getRanndomElement(this.createdUsers);
      const training = getRanndomElement(this.createdTrainings);
      const purchase = generateMockPurchase();
      await client.purchase.create({
          data: {
            price: training.price,
            trainCount: purchase.trainCount,
            totalPrice: training.price * purchase.trainCount,
            paymentType: purchase.paymentType,
            type: purchase.type,
            remainingTrainings: purchase.trainCount,
            user: {
              connect: {id: user.id}
            },
            train: {
              connect: {id: training.id}
            }
          }
        })
    };
    console.log(`${this.purchaces} purchases was created`);
  }

  private async generateReviews(client: PrismaClient) {
    for (let i=0; i < this.reviews; i++) {
      const review = generateMockReview();
      const training = getRanndomElement(this.createdTrainings)
      const trainingRate = await client.training.findFirst({where: {id: training.id}, select: {rate: true}});
      const newRate = (trainingRate && trainingRate.rate > 0) ? (trainingRate?.rate + review.rate) / 2 : review.rate;
      await client.review.create({
        data: {
          rate: review.rate,
          content: review.content,
          author: {
            connect: {id: getRanndomElement(this.createdUsers).id}
          },
          train: {
            connect: {id: training.id}
          }
        }
      });
      await client.training.update({
        where: {id: training.id},
        data: {
          id: undefined,
          title: undefined,
          image: undefined,
          level: undefined,
          type: undefined,
          duration: undefined,
          price: undefined,
          callorieQuantity: undefined,
          description: undefined,
          gender: undefined,
          video: undefined,
          rate: newRate,
          coach: undefined,
          isSpecialOffer: undefined
        }
      });

    };
    console.log(`${this.reviews} reviews was created`);
  }



  public async generate(client: PrismaClient) {
    await  this.generateUsers(client);
    await  this.generateTrainings(client);
    await Promise.all([
      this.generatePurchases(client),
      this.generateReviews(client)
    ]);
  }
}
