import { Module } from '@nestjs/common';
import { RedisModule } from '../provider/redis.provider';
import { PlayerDao } from '../dao/player.dao';
import { PlayerStatementDao } from '../dao/player_statement.dao';

@Module({
  imports: [RedisModule],
  providers: [PlayerDao, PlayerStatementDao],
  exports: [PlayerDao, PlayerStatementDao],
})
export class DaoModule { }
