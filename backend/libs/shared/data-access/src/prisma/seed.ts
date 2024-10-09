import { PrismaClient } from "@prisma/client";
import { DataGenerator } from "./data-generator/data-generator";

type ParsedArguments = Record<string, number>

function processCommand(cliArguments: string[]) {
  const parsedArguments: ParsedArguments = {};
    let currentArgument = '';

    for(const argument of cliArguments) {
      if (argument.startsWith('--')) {
        currentArgument = argument.slice(2);
      } else if (currentArgument && argument) {
        parsedArguments[currentArgument] = parseInt(argument, 10);
      }
    }

    return parsedArguments;
}

async function bootstrap() {
  const cliArguments = processCommand(process.argv);
  const users = cliArguments['users'] ?? 5;
  const trainings = cliArguments['trainings'] ?? 10;
  const reviews = cliArguments['reviews'] ?? 10;
  const purchaces = cliArguments['purchaces'] ?? 10;

  const dataGenerator = new DataGenerator(users, trainings, reviews, purchaces);
  const prismaClient = new PrismaClient();
  try {
    await dataGenerator.generate(prismaClient);
    globalThis.process.exit(0);
  } catch(error: unknown) {
    console.error(error);
    globalThis.process.exit(1)
  } finally {
    await prismaClient.$disconnect;
    console.log('Prisma client disconnected')
  }
}

bootstrap();
