export namespace AuthDto {

    export class LoginBody {
        account: string;
        password: string;
    }

    export class LoginRes {
        token: string;
    }

    export class Operator {
        playerId: string;
    }

}