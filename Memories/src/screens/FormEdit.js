import React, {useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

import theme from '../components/theme';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

import {updatePost} from '../stores/actions/posts';

const {width, height} = Dimensions.get('window');

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Judul terlalu pendek')
    .required('Tidak boleh kosong'),
  caption: Yup.string()
    .min(3, 'Caption terlalu pendek')
    .required('Tidak boleh kosong'),
});

const FormEdit = ({route}) => {
  const {post} = route.params;
  const refNext = useRef(TextInput);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [editData, setEditData] = useState({
    creator: post.creator,
    title: post.title,
    caption: post.caption,
    memories: post.memories,
  });

  const onSubmit = values => {
    setEditData({
      ...editData,
      ...values,
    });

    Alert.alert('Yakin ingin disimpan?', '', [
      {
        text: 'Simpan',
        onPress: () => {
          dispatch(updatePost(post._id, editData));

          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Home',
                    params: {editStatus: 'success'},
                  },
                ],
              }),
            );
          }, 5000);
        },
      },
      {
        text: 'Batal',
        style: 'cancel',
      },
    ]);
  };

  const onBatal = () => {
    Alert.alert('Yakin batal?', '', [
      {
        text: 'Yakin',
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        },
      },
      {
        text: 'Tidak',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          resizeMode="cover"
          source={{uri: post.memories}}
          style={{width: width, height: width}}
        />

        <Formik
          initialValues={{
            title: post.title,
            caption: post.caption,
          }}
          validationSchema={PostSchema}
          onSubmit={values => onSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <View style={styles.input}>
                <TextInput
                  icon="title"
                  placeholder="Judul"
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  touched={touched.title}
                  error={errors.title}
                  value={values.title}
                  onSubmitEditing={() => refNext.current?.focus()}
                />
                {errors.title && touched.title ? (
                  <Text style={theme.texts.error}>{errors.title}</Text>
                ) : null}
              </View>
              <View style={styles.input}>
                <TextArea
                  ref={refNext}
                  icon="message"
                  placeholder="Caption"
                  autoCapitalize="none"
                  returnKeyType="go"
                  returnKeyLabel="Go"
                  onChangeText={handleChange('caption')}
                  onBlur={handleBlur('caption')}
                  touched={touched.caption}
                  error={errors.caption}
                  value={values.caption}
                  onSubmitEditing={() => handleSubmit()}
                />
                {errors.caption && touched.caption ? (
                  <Text style={theme.texts.error}>{errors.caption}</Text>
                ) : null}
              </View>
              <View style={styles.submit}>
                <Button
                  label="Simpan"
                  variant="primary"
                  onPress={handleSubmit}
                />
              </View>
              <View style={styles.batal}>
                <Button
                  label="Batal"
                  variant="default"
                  onPress={() => onBatal()}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default FormEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  form: {
    width: width,
    height: width,
    padding: theme.spacing.l,
  },
  input: {
    marginBottom: 10,
  },
  submit: {
    marginTop: 20,
    alignItems: 'center',
  },
  batal: {
    marginTop: 10,
    alignItems: 'center',
  },
});
