import { Injectable } from '@nestjs/common';
import { PlayerDao } from '../dao/player.dao';
import * as _ from '../util/lodash.util';

@Injectable()
export class PlayerService {

    constructor(
        private readonly playerDao: PlayerDao,
    ) { }

    public async findOneByAccount(account: string) {
        const players = await this.playerDao.findAll();
        return _.find(players, { account });
    }

    public async findOneById(id: string) {
        return this.playerDao.findOneById(id);
    }

}
