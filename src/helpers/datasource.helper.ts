import { postgresDatabase } from '../config';

export const initializeDatabase = () => {
  postgresDatabase.initialize().then(() => {
    console.log('Database initialization is completed!');
  }).catch(err => {
    console.log('Error occurred when initializing the DB!', err);
  });
};
