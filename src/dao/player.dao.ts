import { Injectable } from '@nestjs/common';
import { PlayerDto } from '../dto/player.dto';
import { BaseDao } from './base.dao';

@Injectable()
export class PlayerDao extends BaseDao<PlayerDto.Model> {

    protected readonly PREFIX = 'player';

}