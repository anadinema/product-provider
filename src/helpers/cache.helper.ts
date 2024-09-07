import { redisCache } from '../config';
import express from 'express';

const redisClient = redisCache;

redisClient.on('error', err => {
  console.log('Error occurred on redis client.', err);
});

export const initializeRedis = () => {
  redisClient.connect().then(() => {
    console.log('Redis cache initialization completed!');
  }).catch(err => {
    console.log('Error occurred when initialization Redis!', err);
  });
};

export const isRedisWorking = () => {
  return redisClient.isOpen;
};

export const generateKey = (req: express.Request) => {
  const { id } = req.params;
  const path = req.path.replaceAll('/api/', '').replaceAll('/', ':');

  if (!id) {
    return `${path}:all`;
  } else {
    return `${path}`;
  }
};

export async function write(key: string, data: any) {
  if (isRedisWorking()) {
    redisClient.set(key as any, data, {
      EX: 21600
    } as any).catch(err => {
      console.log(`Error while saving the data for key: ${key} to cache.`, err);
    });
  }
}

export async function read(key: string) {
  let cachedValue = undefined;
  if (isRedisWorking()) {
    cachedValue = redisClient.get(key as any).catch(err => {
      console.log(`Error while fetching key: ${key} from cache.`, err);
    });
  }
  return cachedValue;
}