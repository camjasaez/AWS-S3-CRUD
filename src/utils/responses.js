'use strict';

export const responseSuccess = (res, status = 200, message, response = []) => {
  res.status(status).json({ message, response });
};

export const responseError = (res, status = 500, message, response = []) => {
  res.status(status).json({ message, response });
};
