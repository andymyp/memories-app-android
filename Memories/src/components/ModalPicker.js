import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

import theme from './theme';
import Button from './Button';

const {width, height} = Dimensions.get('window');

const ModalPicker = ({modalVisible, setModalVisible}) => {
  const navigation = useNavigation();

  const Camera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setModalVisible(!modalVisible);
        navigation.navigate('Form', {
          imgType: image.mime,
          imgBase64: image.data,
        });
      })
      .catch(error => {
        return false;
      });
  };

  const Gallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setModalVisible(!modalVisible);
        navigation.navigate('Form', {
          imgType: image.mime,
          imgBase64: image.data,
        });
      })
      .catch(error => {
        return false;
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalViewOuter}>
          <View style={styles.modalView}>
            <Text style={[theme.texts.smheader, styles.title]}>
              Buat Memories
            </Text>
            <Text style={[theme.texts.body, styles.text]}>
              Ambil gambar melalui kamera atau pilih dari gallery
            </Text>
            <Pressable style={styles.button} onPress={() => Camera()}>
              <Button label="Kamera" variant="primary" />
            </Pressable>
            <Pressable style={styles.button} onPress={() => Gallery()}>
              <Button label="Gallery" variant="primary" />
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Button label="Batal" variant="default" />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalViewOuter: {
    width: width,
    height: height * 0.6 + 2,
    borderTopLeftRadius: theme.radius.m,
    borderTopRightRadius: theme.radius.m,
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.colors.grey,
  },
  modalView: {
    width: width,
    height: height * 0.6,
    borderTopLeftRadius: theme.radius.m,
    borderTopRightRadius: theme.radius.m,
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginBottom: 10,
  },
});
