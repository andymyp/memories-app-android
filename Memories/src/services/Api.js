import axios from 'axios';

// const url = 'http://10.0.3.2:5000/posts'; // for emulator
const url = 'http://192.168.43.14:5000/posts'; // for real device

export const fetchPosts = () => axios.get(url);

export const createPost = newPost => axios.post(url, newPost);

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = id => axios.patch(`${url}/${id}`);
