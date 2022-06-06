import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const auth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AuthenticationError('Unauthenticated, no token!');
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, 'NollieHeelFlip');
    return user;
  } catch (error) {
    throw new AuthenticationError('Unauthenticated, no token!');
  }
};
