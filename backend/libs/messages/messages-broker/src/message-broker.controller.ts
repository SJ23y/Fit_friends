import { Controller } from "@nestjs/common";
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from "@backend/shared-core";
import { MessagesEmailService } from "@backend/messages-email";
import { EmailDataDto } from "./dto/EmailData.dto";

@Controller()
export class MessageBrokerController {
  constructor(
    private readonly mailSerivce: MessagesEmailService
  ) {}

  @RabbitSubscribe({
    exchange: 'newTraining.notify',
    routingKey: RabbitRouting.SEND_NEW_TRAINING,
    queue: 'newTraining.notify.send',
  })
  public async sendEmail(dto: EmailDataDto) {
    dto.subscriptions.forEach((subsciption) => {
      this.mailSerivce.sendEmailNewTraining(dto.training, subsciption);
    })
  }
}
