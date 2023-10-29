import mongoose, { Document, model, Schema } from 'mongoose';





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



// Define the Post schema
export interface IPost {
  prompt: string;
  tags: string;
  user: Schema.Types.ObjectId; // Reference to the User who created the post
  // Add other post-related fields as needed
}

const postSchema = new Schema<IPost & Document>({
  prompt: { type: String, required: true },
  tags: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  // Add other post-related fields here
});

const PostModel = mongoose.models.Post || model<IPost & Document>('Post', postSchema);

export { UserModel as UserModel, PostModel as PostModel}