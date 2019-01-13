import { Injectable } from '@nestjs/common';
import { BaseDao } from './base.dao';
import { PlayerStatementDto } from '../dto/player_statement.dto';

@Injectable()
export class PlayerStatementDao extends BaseDao<PlayerStatementDto.Model> {

    protected readonly PREFIX = 'player';

}