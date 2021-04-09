import React, {useState, forwardRef, RefObject} from 'react';
import {StyleSheet, Text, View, TextInput as TI} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from './theme';

const TextArea = forwardRef(({icon, touched, error, ...props}, ref) => {
  const color = !touched
    ? theme.colors.grey
    : error
    ? theme.colors.red
    : theme.colors.purplePrimary;

  const bgColor = !error ? theme.colors.purplePrimary : theme.colors.red;
  const iconName = !error ? 'check' : 'close';

  return (
    <View style={[styles.container, {borderColor: color}]}>
      <View style={styles.iconLeft}>
        <Icon name={icon} size={20} {...{color}} />
      </View>
      <View style={styles.iconRight}>
        <TI
          style={[theme.texts.body, {textAlignVertical: 'top'}]}
          multiline={true}
          numberOfLines={5}
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          {...{ref}}
          {...props}
        />
      </View>
      {touched && (
        <View
          style={[
            styles.valid,
            {
              backgroundColor: bgColor,
            },
          ]}>
          <Icon name={iconName} size={14} color={theme.colors.white} />
        </View>
      )}
    </View>
  );
});

export default TextArea;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  iconLeft: {
    marginRight: 5,
    marginTop: 10,
  },
  iconRight: {
    flex: 1,
  },
  valid: {
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
