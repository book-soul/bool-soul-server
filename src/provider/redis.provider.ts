import { Module } from '@nestjs/common';
import { RedisOptions, Redis } from 'ioredis';
import * as IoRedis from 'ioredis';
import { ProviderConst } from '../const/provider.const';

const connectionFactory = {
    provide: ProviderConst.RedisProvider,
    useFactory: () => {
        const options: RedisOptions = {
            port: 6379,
            host: '127.0.0.1',
            family: 4, // 4 (IPv4) or 6 (IPv6)
            password: 'auth',
            db: 8,
            retryStrategy(times: number) {
                return Math.min(times * 100, 2000);
            },
        };
        return new IoRedis(options);
    },
};

@Module({
    providers: [connectionFactory],
    exports: [connectionFactory],
})
export class RedisModule { }

export interface IRedis extends Redis { }