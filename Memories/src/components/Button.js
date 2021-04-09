import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import theme from './theme';

const Button = ({variant, label, onPress, children}) => {
  const backgroundColor =
    variant == 'primary'
      ? theme.colors.purplePrimary
      : variant == 'transparent'
      ? 'transparent'
      : theme.colors.greyLight;

  const color = variant == 'primary' ? theme.colors.white : theme.colors.text;

  return (
    <RectButton style={[styles.container, {backgroundColor}]} {...{onPress}}>
      {children ? (
        children
      ) : (
        <Text style={[theme.texts.button, {color}]}>{label}</Text>
      )}
    </RectButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
