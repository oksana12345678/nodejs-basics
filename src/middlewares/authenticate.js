import createHttpError from 'http-errors';
import { SessionCollection } from '../db/model/session.js';
import { UserCollection } from '../db/model/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  const token = parts[1];

  if (!token) {
    return next(createHttpError(401, 'Token is missing'));
  }

  const session = await SessionCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UserCollection.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};
