import { Test, TestingModule } from '@nestjs/testing';
import { ControllerModule } from '../src/module/controller.module';
import { AuthController } from '../src/controller/auth.controller';
import { BadRequestException } from '@nestjs/common';
import { Init } from './seed';
import { ProviderConst } from '../src/const/provider.const';

let authController: AuthController;

describe('AuthController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [ControllerModule],
        }).compile();
    });

    beforeEach(async () => {
        await Init(app.get(ProviderConst.RedisProvider));
        authController = app.get(AuthController);
    });

    describe('postLogin', async () => {
        it('正常登录', async () => {
            const response = await authController.postLogin({
                account: 'zhouyu',
                password: '123456',
            });
            const expection = 'string';

            expect(typeof response.token).toBe(expection);
        });

        it('错误登录', async () => {
            expect(new Promise((resolve, reject) => {
                return resolve(authController.postLogin({
                    account: 'zhouysdajhuhuh2u',
                    password: '123456dsadju23',
                }));
            })).rejects.toThrow(BadRequestException);
        });
    });

    describe('getMe', async () => {
        it('正常情况', async () => {
            const response = await authController.getMe({
                playerId: '1',
            });
            const expection = { playerId: '1' };

            expect(response.playerId).toBe(expection.playerId);
        });
    });
});
