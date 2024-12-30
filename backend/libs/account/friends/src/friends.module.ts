import { Module } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { FriendsFactory } from './friends.factory';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { NotificationModule } from '@backend/notiifcation'

@Module({
  controllers: [FriendsController],
  providers: [FriendsRepository, FriendsFactory, FriendsService],
  imports: [NotificationModule],
  exports: [FriendsRepository]
})
export class FriendsModule {}
