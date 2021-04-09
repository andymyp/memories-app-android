import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import theme from './theme';

import Loading from './Loading';
import Post from './Post';

const Posts = () => {
  const posts = useSelector(state => state.posts);

  return !posts.length ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
