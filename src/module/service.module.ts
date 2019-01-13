import { Module } from '@nestjs/common';
import { DaoModule } from './dao.module';
import { AuthService } from '../service/auth.service';
import { PlayerService } from '../service/player.service';
import { JwtStrategy } from '../provider/passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppConst } from '../const/app.const';
import { PlayerStatementService } from '../service/player_statement.service';

@Module({
  imports: [
    DaoModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secretOrPrivateKey: AppConst.SECRET_KEY,
      signOptions: {
        expiresIn: '5 days',
      },
    }),
  ],
  providers: [AuthService, PlayerService, JwtStrategy, PlayerStatementService],
  exports: [AuthService, PlayerStatementService],
})
export class ServiceModule { }
