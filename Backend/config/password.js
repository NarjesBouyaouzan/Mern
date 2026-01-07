import bcryptjs from 'bcryptjs';

/**
 * Hash password using bcryptjs
 * Generates a salt and hashes the password
 */
export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

/**
 * Compare plain password with hashed password
 * Returns true if passwords match
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcryptjs.compare(plainPassword, hashedPassword);
};
