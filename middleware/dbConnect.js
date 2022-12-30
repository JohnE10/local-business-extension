import mongoose from 'mongoose';

export const dbConnect = async () => mongoose.connect(process.env.dbURI);

