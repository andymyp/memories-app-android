import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from './theme';
import Button from './Button';
import ModalPicker from './ModalPicker';

const {width, height} = Dimensions.get('window');

const ImgPicker = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.avContainer}>
        <Image
          resizeMode="cover"
          style={styles.avatar}
          source={require('../assets/images/avatars/avatar.png')}
        />
      </View>
      <View style={styles.ipContainer}>
        <RectButton
          style={styles.imagePicker}
          onPress={() => setModalVisible(true)}>
          <Icon
            style={styles.icon}
            name="add-a-photo"
            size={25}
            color={theme.colors.purplePrimary}
          />
          <Text style={theme.texts.body}>Buat memories</Text>
        </RectButton>
      </View>

      <ModalPicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.s,
  },
  avContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  ipContainer: {
    marginLeft: 8,
    width: width - 75,
    height: 48,
    borderColor: theme.colors.purplePrimary,
    borderRadius: theme.radius.m,
    borderWidth: 1,
  },
  imagePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.white,
  },
  icon: {
    marginRight: 10,
  },
});
