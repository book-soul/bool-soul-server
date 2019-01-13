import { Controller, Get, Body, BadRequestException, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { ExMessage } from '../exception/message';
import { Operator } from '../decorator/operator.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    public async postLogin(
        @Body() body: AuthDto.LoginBody,
    ): Promise<AuthDto.LoginRes> {
        const res = await this.authService.login(body);
        if (!res) throw new BadRequestException(ExMessage.BAD_REQ.ACCOUNT_PWD_ERROR);
        return res;
    }

    @UseGuards(AuthGuard())
    @Get('me')
    public async getMe(
        @Operator() operator: AuthDto.Operator,
    ): Promise<AuthDto.Operator> {
        return operator;
    }

}
