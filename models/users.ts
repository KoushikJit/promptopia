import mongoose, { Document, Schema, model } from 'mongoose';

// Create the User model
export interface IUser {
  username: string;
  email: string;
  password: string,
  image: string,
  // Define other fields as needed
}

// Define the User schema
const userSchema = new Schema<IUser & Document>({
  username: { type: String, required: true,unique: true, },
  email: {
    type: String,
    required: true,
    unique: true,
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
});


const UserModel =mongoose.models.User || model<IUser & Document>('User', userSchema);

export default UserModel