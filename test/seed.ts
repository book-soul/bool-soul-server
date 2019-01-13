import { Redis } from 'ioredis';

export async function Init(redis: Redis) {
    await redis.flushdb();
    await redis.hmset('player/1', { id: '1', account: 'zhouyu', password: '123456' });
    await redis.hmset('statement/1', { id: '1', content: '我出生于无鸣谷，这里是一个小镇' });
    await redis.hmset('player/1/statement/1', {
        id: '1',
        playerId: '1',
        statementId: '1',
        prevId: '',
        nextId: '',
    });
}