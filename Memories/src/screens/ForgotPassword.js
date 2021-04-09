import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import * as Yup from 'yup';

import theme from '../components/theme';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const {width, height} = Dimensions.get('window');

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email('Format email salah')
    .required('Tidak boleh kosong'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.top}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../assets/images/backgrounds/memories_bg.jpg')}
          style={styles.headerContainer}></ImageBackground>
      </View>

      <View style={styles.body}>
        <Text style={[styles.subheader, theme.texts.subheader]}>
          Lupa password?
        </Text>
        <Text style={[styles.textbody, theme.texts.body]}>
          Masukan email anda untuk mendapatkan link reset passsword
        </Text>

        <Formik
          initialValues={{email: ''}}
          validationSchema={ForgotSchema}
          onSubmit={values => console.log(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.input}>
                <TextInput
                  icon="email"
                  placeholder="Input email kamu"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  returnKeyType="go"
                  returnKeyLabel="Submit"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  touched={touched.email}
                  error={errors.email}
                  onSubmitEditing={() => handleSubmit()}
                />
                {errors.email && touched.email ? (
                  <Text style={theme.texts.error}>{errors.email}</Text>
                ) : null}
              </View>
              <View style={styles.submit}>
                <Button
                  label="Reset password"
                  variant="primary"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.footer}>
          <Button
            label="Masuk sekarang"
            variant="transparent"
            onPress={() => navigation.navigate('Login')}
          />
        </View>

        <View style={{height: insets.bottom}} />
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  top: {
    height: height * 0.3 + theme.radius.l,
    overflow: 'hidden',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    top: height * 0.3,
    borderTopLeftRadius: theme.radius.l,
    borderTopRightRadius: theme.radius.l,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  subheader: {
    marginBottom: 20,
  },
  textbody: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
    width: width,
    paddingHorizontal: theme.spacing.xl,
  },
  submit: {
    marginTop: 20,
    alignSelf: 'center',
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    marginTop: 10,
  },
});
