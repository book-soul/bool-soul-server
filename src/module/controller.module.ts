import { Module } from '@nestjs/common';
import { ServiceModule } from './service.module';
import { AuthController } from '../controller/auth.controller';
import { PlayerStatementController } from '../controller/player_statement.controller';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, PlayerStatementController],
})
export class ControllerModule { }
