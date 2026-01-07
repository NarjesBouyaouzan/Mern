import mongoose from 'mongoose';

/**
 * Profile Model - 1-to-1 relationship with User
 * Contains additional user information like bio, avatar, skills
 * 
 * Fields:
 * - userId: Reference to User (1-to-1)
 * - bio: User's biography
 * - avatar: Avatar URL or path
 * - skills: Array of skills
 */
const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    skills: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
