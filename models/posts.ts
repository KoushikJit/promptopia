import mongoose, { Document, model, Schema } from 'mongoose';

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
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  // Add other post-related fields here
});

const PostModel = mongoose.models.Post || model<IPost & Document>('Post', postSchema);

export default PostModel;