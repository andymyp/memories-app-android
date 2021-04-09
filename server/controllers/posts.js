import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (request, response) => {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: "desc" });
    response.status(200).json(postMessages);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const createPost = async (request, response) => {
  const body = request.body;
  const newPost = new PostMessage(body);

  try {
    await newPost.save();
    response.status(201).json(newPost);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const updatePost = async (request, response) => {
  const { id } = request.params;
  const body = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).send("Memories tidak ditemukan");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { id, ...body },
    {
      new: true,
    }
  );
  response.json(updatedPost);
};

export const deletePost = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).send("Memories tidak ditemukan");
  }

  await PostMessage.findByIdAndDelete(id);
  response.json({ message: "Memories berhasil dihapus" });
};
