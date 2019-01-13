import { Test, TestingModule } from '@nestjs/testing';
import { ControllerModule } from '../src/module/controller.module';
import { BadRequestException } from '@nestjs/common';
import { PlayerStatementController } from '../src/controller/player_statement.controller';
import { Init } from './seed';
import { ProviderConst } from '../src/const/provider.const';

let playerStatementController: PlayerStatementController;

describe('PlayerStatementController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [ControllerModule],
        }).compile();
    });

    beforeEach(async () => {
        await Init(app.get(ProviderConst.RedisProvider));
        playerStatementController = app.get(PlayerStatementController);
    });

    describe('getCurrent', async () => {
        it('正常情况', async () => {
            const response = await playerStatementController.getCurrent('1');
            const expection = '1';

            expect(response.id).toBe(expection);
        });
    });

    describe('getStatementNext', async () => {
        it('正常情况', async () => {
            const response = await playerStatementController.getStatementNext('1', '1');
            const expection = 50;

            expect(response.length).toBe(expection);
        });
    });

    describe('getStatementPrev', async () => {
        it('正常情况', async () => {
            const response = await playerStatementController.getStatementPrev('1', '1');
            const expection = 0;

            expect(response.length).toBe(expection);
        });
    });
});
