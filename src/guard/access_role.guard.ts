import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthorityConst } from '../const/authority.const';
import { AuthDto } from '../dto/auth.dto';
import * as _ from '../util/lodash.util';

@Injectable()
export class AccessRoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        let roles = this.reflector.get<AuthorityConst.Role | AuthorityConst.Role[]>('accessRoles', context.getHandler());
        if (!roles) {
            return true;
        } else if (!Array.isArray(roles)) {
            roles = [roles];
        }

        const request = context.switchToHttp().getRequest();
        const playerId = _.get(request, 'params.playerId');
        if (!playerId) return false;
        const operator: AuthDto.Operator = request.user;

        for (const role of roles) {
            const boolean = this.validRole(role, playerId, operator);
            if (boolean) return boolean;
        }

        return false;
    }

    public validRole(role: AuthorityConst.Role, playerId: string, operator: AuthDto.Operator) {
        switch (role) {
            case AuthorityConst.Role.PLAYER:
                return playerId === operator.playerId;
            case AuthorityConst.Role.ADMIN:
                return true;
            case AuthorityConst.Role.SUPER_ADMIN:
                return true;
        }
    }

}