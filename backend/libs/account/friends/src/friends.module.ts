import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@backend/authentication'
import { FriendsRepository } from './friends.repository';
import { FriendsFactory } from './friends.factory';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';

@Module({
  controllers: [FriendsController],
  providers: [FriendsRepository, FriendsFactory, FriendsService],
  imports: [AuthenticationModule],
  exports: [FriendsRepository]
})
export class FriendsModule {}
