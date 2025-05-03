import { hash, compare } from 'bcryptjs';

export const decode = async (data, salt) => {
  const HashedData = await hash(data, salt);
  return HashedData;
};

export const enCode = async (data, HeshCode) => {
  const ismatch = await compare(data, HashedData);
  return ismatch;
};
