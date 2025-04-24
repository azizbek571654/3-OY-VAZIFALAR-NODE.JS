import jwt from "jsonwebtoken";

export const generateAcessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_TIME,
  });
};

export const generateRefereshToken = (payload) => {
  return jwt.sign(payload, process.env.REFERESH_TOKEN_KEY, {
    expiresIn: process.env.REFERESH_TOKEN_TIME,
  });
};
