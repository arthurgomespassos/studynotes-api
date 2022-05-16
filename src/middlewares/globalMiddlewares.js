import cors from 'cors'
import helmet from 'helmet';
import express from 'express';
import corsOptions from '../config/corsOptions';

export default [
  express.json(),
  express.urlencoded({ extended: true }),
  cors(corsOptions),
  helmet()
];
