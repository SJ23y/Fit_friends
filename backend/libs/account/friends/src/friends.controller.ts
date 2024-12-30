import 'multer';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@backend/shared-helpers';
import { FriendsService } from './friends.service';
import { FriendsErrorMessages } from './friend.conts';
import { FriendsQuery } from './friends.query';
import { FriendsWithPaginationRdo } from './rdo/friends-with-pagination';
import { AuthCheckGuard } from '@backend/shared-guards';
import { RequestWithUserPayload } from '@backend/shared-core';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  private logger = new Logger('Friends controller');

  constructor(
    private readonly friendsService: FriendsService
  ) {}

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: FriendsErrorMessages.FriendAdded
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: FriendsErrorMessages.Unauthorized
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FriendsErrorMessages.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: FriendsErrorMessages.IsCoach
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: FriendsErrorMessages.IsNotUUID
  })
  @UseGuards(AuthCheckGuard)
  @Post('/:friendId')
  public async create(@Param('friendId', ParseUUIDPipe) friendId: string, @Req() {user}: RequestWithUserPayload) {
    await this.friendsService.addFriend(user, friendId);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: FriendsErrorMessages.FriendDeleted
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: FriendsErrorMessages.Unauthorized
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FriendsErrorMessages.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: FriendsErrorMessages.IsCoach
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: FriendsErrorMessages.IsNotUUID
  })
  @UseGuards(AuthCheckGuard)
  @Delete('/:friendId')
  public async delete(@Param('friendId', ParseUUIDPipe) friendId: string,@Req() {user}: RequestWithUserPayload) {
    await this.friendsService.deleteFriend(user, friendId);
  }

  @ApiResponse({
    status: HttpStatus.OK
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: FriendsErrorMessages.Unauthorized
  })
  @UseGuards(AuthCheckGuard)
  @Get('')
  public async index(@Req() {user}: RequestWithUserPayload, @Query() query?: FriendsQuery) {
    const paginatedFriends = await this.friendsService.getFriendsList(user.id ?? '', query);
    return fillDto(FriendsWithPaginationRdo, paginatedFriends);
  }
}
