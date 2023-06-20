import mongoose from 'mongoose';

export default async function connectDatabase(connectionString: string) {
  mongoose.set('strictQuery', false);
  return mongoose
    .connect(connectionString)
    .then(() => {
      console.log('[database]: Connected to MongoDB');
      return true;
    })
    .catch((e) => {
      throw new Error('Error : ' + e);
    });
}
