import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  creator: String,
  title: String,
  caption: String,
  memories: String,
  like: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
