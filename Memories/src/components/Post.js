import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import theme from './theme';

import {deletePost} from '../stores/actions/posts';

// Indonesian locale
var idLocale = require('moment/locale/id');
moment.updateLocale('id', idLocale);

const {width, height} = Dimensions.get('window');

const Post = ({post}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onEdit = () => {
    navigation.navigate('FormEdit', {
      post: post,
    });
  };

  const onDelete = () => {
    Alert.alert('Yakin ingin dihapus?', '', [
      {
        text: 'Hapus',
        onPress: () => {
          dispatch(deletePost(post._id));
        },
      },
      {
        text: 'Batal',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Pressable onPress={() => alert('Image')}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{uri: post.memories}}
          />
        </Pressable>
        <View style={styles.btnAction}>
          <Pressable style={styles.edit} onPress={() => onEdit()}>
            <Icon name="edit" size={20} color={theme.colors.white} />
          </Pressable>
          <Pressable style={styles.delete} onPress={() => onDelete()}>
            <Icon name="delete" size={20} color={theme.colors.white} />
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.author}>
          <Pressable onPress={() => alert('Avatar')}>
            <Image
              resizeMode="cover"
              style={styles.avatar}
              source={require('../assets/images/avatars/avatar.png')}
            />
          </Pressable>
          <Pressable
            style={styles.titleContainer}
            onPress={() => alert('Resep')}>
            <Text style={theme.texts.smheader}>{post.title}</Text>
            <Text style={theme.texts.body}>{post.creator}</Text>
          </Pressable>
        </View>
        <View style={styles.caption}>
          <Text style={theme.texts.body}>{post.caption}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.left}>
            <Icon name="schedule" size={20} color={theme.colors.text} />
            <Text style={[theme.texts.body, styles.textLeft]}>
              {moment(post.createdAt).fromNow()}
            </Text>
          </View>
          <Pressable style={styles.right} onPress={() => alert('Like')}>
            <Icon
              name="thumb-up-off-alt"
              size={20}
              color={theme.colors.purplePrimary}
            />
            <Text style={[theme.texts.body, styles.textRight]}>
              {post.like}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: width - theme.spacing.s * 2,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.greyLight,
    borderRadius: theme.radius.m,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: width - theme.spacing.s,
    height: width / 2,
    alignSelf: 'center',
  },
  btnAction: {
    flexDirection: 'column',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  edit: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.purplePrimary,
    borderRadius: 20,
  },
  delete: {
    marginTop: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.red,
    borderRadius: 20,
  },
  body: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  author: {
    marginTop: 5,
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  titleContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  caption: {
    width: width - theme.spacing.s * 2 - 20,
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLeft: {
    marginLeft: 5,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRight: {
    marginLeft: 5,
    color: theme.colors.purplePrimary,
  },
});
