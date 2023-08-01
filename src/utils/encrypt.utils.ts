import * as bcrypt from 'bcrypt';

export const generateHash = async (
  password: string,
  saltRounds = 10,
): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const verifyHash = async (
  password: string,
  passwordHash,
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
