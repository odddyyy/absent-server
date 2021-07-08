import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

export const JWT_CONSTANT = {
  privateKey: process.env.JWT_SECRET,
};
