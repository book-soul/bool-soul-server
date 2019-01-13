import { Injectable } from '@nestjs/common';
import * as _ from '../util/lodash.util';
import { PlayerStatementDao } from '../dao/player_statement.dao';
import { PlayerStatementDto } from '../dto/player_statement.dto';
import { $ } from '../util/support.util';

@Injectable()
export class PlayerStatementService {

    constructor(
        private readonly playerStatementDao: PlayerStatementDao,
    ) { }

    public async findOneLatest(
        playerId: string,
    ) {
        const playerStatements = await this.playerStatementDao.findAll({
            where: `${playerId}/statement/*`,
        });
        return _.find(playerStatements, { nextId: '' });
    }

    public async findAllPrev(
        playerId: string,
        currentId: string,
        limit: number,
    ) {
        let prevId = currentId;
        const playerStatements: PlayerStatementDto.Model[] = [];
        for (const index of _.range(limit)) {
            const playerStatement = await this.playerStatementDao.findOneById(`${playerId}/statement/${prevId}`);
            if (!playerStatement || playerStatement.id === currentId) continue;
            playerStatements.push(playerStatement);
            prevId = playerStatement.prevId;
        }
        return playerStatements;
    }

    public async bulkCreate(
        playerId: string,
        currentId: string,
        limit: number,
    ) {
        const statementIds = ['1'];
        const tasks: Promise<PlayerStatementDto.Model>[] = [];
        const params: PlayerStatementDto.Model[] = [];
        for (const index of _.range(limit)) {
            const statementId = _.sample(statementIds);
            if (!statementId) continue;

            params.push({
                id: $.makeId(),
                playerId,
                statementId,
                prevId: '',
                nextId: '',
            });
        }
        for (const param of params) {
            const index = _.findIndex(params, param);
            const prev: PlayerStatementDto.Model | undefined = _.get(params, `[${index - 1}]`);
            const next: PlayerStatementDto.Model | undefined = _.get(params, `[${index + 1}]`);

            const data: PlayerStatementDto.Model = {
                id: param.id,
                playerId: param.playerId,
                prevId: index === 0 ? currentId : (prev ? prev.id : ''),
                nextId: next ? next.id : '',
                statementId: param.statementId,
            };
            const task = this.playerStatementDao.create(
                `${playerId}/statement/${$.makeId()}`,
                data,
            );
            tasks.push(task);
        }
        return Promise.all(tasks);
    }

}
