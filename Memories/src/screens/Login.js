import React, {useRef} from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Format email salah')
    .required('Tidak boleh kosong'),
  password: Yup.string()
    .min(6, 'Password terlalu pendek')
    .max(20, 'Password terlalu panjang')
    .required('Tidak boleh kosong'),
});

const Login = () => {
  const refPassword = useRef(TextInput);
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
          Selamat datang
        </Text>
        <Text style={[styles.textbody, theme.texts.body]}>
          Masukan email dan password untuk masuk ke akun kamu
        </Text>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={values => navigation.navigate('DrawerNavigator')}>
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
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  touched={touched.email}
                  error={errors.email}
                  onSubmitEditing={() => refPassword.current?.focus()}
                />
                {errors.email && touched.email ? (
                  <Text style={theme.texts.error}>{errors.email}</Text>
                ) : null}
              </View>
              <View style={styles.input}>
                <TextInput
                  icon="lock"
                  placeholder="Input password kamu"
                  autoCompleteType="password"
                  returnKeyType="go"
                  returnKeyLabel="Go"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  touched={touched.password}
                  error={errors.password}
                  ref={refPassword}
                  onSubmitEditing={() => handleSubmit()}
                />
                {errors.password && touched.password ? (
                  <Text style={theme.texts.error}>{errors.password}</Text>
                ) : null}
              </View>
              <View style={styles.submit}>
                <Button
                  label="Masuk"
                  variant="primary"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.footer}>
          <TouchableOpacity
            variant="transparent"
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={theme.texts.button}>Lupa password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            variant="transparent"
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={[theme.texts.button, {color: theme.colors.purplePrimary}]}>
              Daftar sekarang
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: insets.bottom}} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  top: {
    height: height * 0.2 + theme.radius.l,
    overflow: 'hidden',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    top: height * 0.2,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
});
