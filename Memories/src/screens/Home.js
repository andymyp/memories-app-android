import React, {useEffect} from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {getPosts} from '../stores/actions/posts';

import theme from '../components/theme';
import Header from '../components/Header';
import ImgPicker from '../components/ImgPicker';
import Posts from '../components/Posts';

const Home = ({route}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  if (route.params) {
    const {postStatus} = route.params;

    if (postStatus == 'success') {
      Alert.alert('Memories berhasil disimpan');
    }
  }

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={[styles.header, {paddingTop: insets.top + 10}]}>
        <Header
          icon="menu"
          title="Beranda"
          color={theme.colors.white}
          onPress={() => navigation.openDrawer()}
        />
      </View>

      <ScrollView style={styles.body}>
        <ImgPicker />
        <Posts />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    backgroundColor: theme.colors.purplePrimary,
    paddingBottom: 10,
  },
  body: {
    flex: 1,
  },
});
