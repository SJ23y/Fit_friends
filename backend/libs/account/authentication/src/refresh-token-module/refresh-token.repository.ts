import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';
import { Injectable } from '@nestjs/common';
import { JwtToken } from '@backend/shared-core';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, JwtToken> {
  constructor(
    protected readonly tokenFactory: RefreshTokenFactory,
    readonly client: PrismaClientService
  ) {
    super(tokenFactory);
  }

  public async save(token: RefreshTokenEntity): Promise<RefreshTokenEntity> {
    const newToken = await this.client.token.create({
      data: {
        ...token.toPOJO()
      }
    });

    return this.createEntityFromDocument(newToken);
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const token = await this.client.token.findFirst({where: {tokenId: tokenId}});

    return token ? this.createEntityFromDocument(token) : null;
  }

  public async deleteByTokenId(tokenId: string) {
    return this.client.token.delete({where: {id: tokenId}});
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.client.token.deleteMany({ where: { expiresIn: {lt: new Date()}}})
  }
}
