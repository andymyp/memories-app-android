import {moderateScale} from 'react-native-size-matters';

const colors = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#FFFFFF',

  red: '#FF0058',

  grey: '#A7A7A7',
  greyLight: 'rgba(167, 167, 167, 0.6)',

  yellow: '#E5B42E',

  text: '#272829',
};

const spacing = {
  s: moderateScale(8),
  m: moderateScale(16),
  l: moderateScale(20),
  xl: moderateScale(40),
};

const radius = {
  s: moderateScale(5),
  m: moderateScale(25),
  l: moderateScale(40),
  xl: moderateScale(75),
};

const texts = {
  header: {
    fontFamily: 'Rubik-Bold',
    fontSize: moderateScale(35),
    lineHeight: moderateScale(42.5),
    color: colors.black,
  },
  subheader: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(30),
    color: colors.black,
  },
  smheader: {
    fontFamily: 'Rubik-Medium',
    fontSize: moderateScale(16),
    color: colors.text,
  },
  body: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: colors.text,
  },
  button: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(14),
    color: colors.text,
  },
  error: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(13),
    color: colors.red,
  },
};

export default {colors, spacing, radius, texts};
