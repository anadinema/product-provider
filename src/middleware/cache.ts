import express from 'express';
import { generateKey, isRedisWorking, read, write } from '../helpers/cache.helper';

export async function cache(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (isRedisWorking()) {
    const key = generateKey(req);
    const cachedData = await read(key);

    if (cachedData) {
      console.log(`CACHE: HIT for key: ${key}`)
      return res.json(JSON.parse(cachedData));
    } else {
      console.log(`CACHE: MISS for key: ${key}`)
      const initialSend = res.send;
      res.send = (data: any) => {
        res.send = initialSend;
        if (res.statusCode === 200) {
          console.log(`CACHE: SAVE for key: ${key}`)
          write(key, data);
        }
        return res.send(data);
      };
    }
  }
  next();
}