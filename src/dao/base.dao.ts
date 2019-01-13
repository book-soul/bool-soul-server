import { Injectable, Inject } from '@nestjs/common';
import { IRedis } from '../provider/redis.provider';
import { ProviderConst } from '../const/provider.const';
import { DatabaseConst } from '../const/database.const';

interface FindOption {
    where: string;
}

export class BaseDao<T extends {}> {

    protected readonly PREFIX: string;

    constructor(
        @Inject(ProviderConst.RedisProvider) protected readonly redis: IRedis,
    ) { }

    public async findOneById(
        id: string,
    ): Promise<T | undefined> {
        const key = `${this.PREFIX}/${id}`;
        if (await this.redis.hlen(key) === 0) return undefined;
        return this.redis.hgetall(key);
    }

    public async findAll(option: FindOption = {
        where: '*',
    }): Promise<T[]> {
        return new Promise((resolve, reject) => {
            const stream = this.redis.scanStream({
                match: `${this.PREFIX}/${option.where}`,
                count: DatabaseConst.BULK_COUNT,
            });
            let tasks: Promise<T>[] = [];
            stream.on('data', (resultKeys) => {
                for (const resultKey of resultKeys) {
                    const result = this.redis.hgetall(resultKey);
                    tasks = tasks.concat(result);
                }
            });
            stream.on('end', () => {
                return resolve(Promise.all(tasks));
            });
            stream.on('error', (err) => {
                return reject(err);
            });
        });
    }

    public async create(
        id: string,
        data: T,
    ): Promise<T> {
        const boolean = await this.redis.hmset(`${this.PREFIX}/${id}`, data);
        if (!boolean) throw Error('保存失败');
        return data;
    }

}