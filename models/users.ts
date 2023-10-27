import mongoose, { Document, Schema } from 'mongoose';

// Define the User schema
const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    // Regular expression to validate email format
    validate: {
      validator: (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email address format',
    },
  },
  password: {
    type: String,
    required: true,
  },  
  image: {
    type: String,
    required: false,
  }
  // Other user fields
  // ...
});

// Create the User model
export interface User extends Document {
  username: string;
  email: string;
  password: string,
  image: string,
  // Define other fields as needed
}

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
