import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer'
import { getMailerAsyncOptions } from '@backend/shared-helpers'
import { MessagesEmailService } from './messages-email.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('messages.mail')),
  ],
  controllers: [],
  providers: [MessagesEmailService],
  exports: [MessagesEmailService],
})
export class MessagesEmailModule {}
