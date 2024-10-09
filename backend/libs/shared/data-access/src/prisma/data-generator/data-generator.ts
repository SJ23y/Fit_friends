import { PrismaClient } from "@prisma/client";
import { generateMockTraining } from "../mock-data/mock-trainings";

export class DataGenerator {
  constructor(
    private readonly users: number,
    private readonly trainings: number,
    private readonly reviews: number,
    private readonly purchaces: number,
  ) {}

  public async generate(client: PrismaClient) {
    for (let i=0; i < this.trainings; i++) {
      await client.training.create({
        data: {
          ...generateMockTraining()
        }
      });
    };
    console.log(`${this.trainings} trainings was created`);
  }
}
