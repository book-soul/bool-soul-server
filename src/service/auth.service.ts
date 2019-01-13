import { Injectable } from '@nestjs/common';
import { PlayerService } from './player.service';
import { AuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly playerService: PlayerService,
        private readonly jwtService: JwtService,
    ) { }

    public async login(
        data: AuthDto.LoginBody,
    ): Promise<AuthDto.LoginRes | false> {
        const player = await this.playerService.findOneByAccount(data.account);
        if (player && player.password === data.password) {
            return {
                token: this.signToken({ playerId: player.id }),
            };
        }
        return false;
    }

    private signToken(data: object) {
        // 5天过期
        return this.jwtService.sign(data, {
            expiresIn: '5 days',
        });
    }

    public async validPlayer(payload: AuthDto.Operator): Promise<boolean> {
        return !!this.playerService.findOneById(payload.playerId);
    }

}
