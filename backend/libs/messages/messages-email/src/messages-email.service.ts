import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { messagesConfig } from '@backend/messages-config';
import { Subscription, Training, CLIENT_URL, SERVER_URL  } from "@backend/shared-core";
import { NEW_TRAINING_EMAIL_SUBJECT } from "./messages-email.consts";


@Injectable()
export class MessagesEmailService {
  constructor(
    private readonly mailSerivce: MailerService,
    @Inject(messagesConfig.KEY)
    private readonly serviceConfig: ConfigType<typeof messagesConfig>
  ) {}

  public async sendEmailNewTraining(training: Training, subsciption: Subscription) {
    this.mailSerivce.sendMail({
      from: this.serviceConfig.mail.from,
      to: subsciption.subscribeByEmail,
      subject: NEW_TRAINING_EMAIL_SUBJECT,
      template: './send-new-training',
      context: {
        title: NEW_TRAINING_EMAIL_SUBJECT,
        subscriber: subsciption.subscribeByName,
        coach: subsciption.subscribeToName,
        trainingTitle: training.title,
        image: `${SERVER_URL}${training.image}`,
        type: training.type,
        duration: training.duration,
        level: training.level,
        gender: training.gender,
        callories: training.callorieQuantity,
        trainingUrl: `${CLIENT_URL}:${this.serviceConfig.clientPort}/training/${training.id}`
      }
    })
  }
}
