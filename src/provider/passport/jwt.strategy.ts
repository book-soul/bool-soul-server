import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { AppConst } from '../../const/app.const';
import { AuthDto } from '../../dto/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AppConst.SECRET_KEY,
        });
    }

    public async validate(payload: AuthDto.Operator) {
        const isExisted = await this.authService.validPlayer(payload);
        if (!isExisted) {
            throw new UnauthorizedException();
        }
        return true;
    }

}