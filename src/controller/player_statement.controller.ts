import { Controller, Get, Body, BadRequestException, Post, UseGuards, Param, NotFoundException, Query } from '@nestjs/common';
import { ExMessage } from '../exception/message';
import { AuthGuard } from '@nestjs/passport';
import { PlayerStatementDto } from '../dto/player_statement.dto';
import { PlayerStatementService } from '../service/player_statement.service';
import { AccessRoleGuard } from '../guard/access_role.guard';
import { AccessRole } from '../decorator/access_role.decorator';
import { AuthorityConst } from '../const/authority.const';

@UseGuards(AuthGuard())
@AccessRole(AuthorityConst.Role.PLAYER)
@UseGuards(AccessRoleGuard)
@Controller('players/:playerId/statements')
export class PlayerStatementController {

    constructor(
        private readonly playerStatementService: PlayerStatementService,
    ) { }

    @Get('current')
    public async getCurrent(
        @Param('playerId') playerId: string,
    ): Promise<PlayerStatementDto.Model> {
        const res = await this.playerStatementService.findOneLatest(playerId);
        if (!res) throw new NotFoundException(ExMessage.NOT_FOUND.COMMON);
        return res;
    }

    @Get(':statementId/next')
    public async getStatementNext(
        @Param('playerId') playerId: string,
        @Param('statementId') statementId: string,
    ): Promise<PlayerStatementDto.Model[]> {
        return this.playerStatementService.bulkCreate(playerId, statementId, 50);
    }

    @Get(':statementId/prev')
    public async getStatementPrev(
        @Param('playerId') playerId: string,
        @Param('statementId') statementId: string,
    ): Promise<PlayerStatementDto.Model[]> {
        return this.playerStatementService.findAllPrev(playerId, statementId, 50);
    }

}
