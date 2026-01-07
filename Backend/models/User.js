import mongoose from 'mongoose';

/**
 * User Model - Represents a student or instructor
 * 
 * Fields:
 * - name: User's full name
 * - email: Unique email address
 * - password: Hashed password (bcrypt)
 * - role: Either 'student' or 'instructor'
 * - createdAt: Timestamp of account creation
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['student', 'instructor'],
      default: 'student',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
