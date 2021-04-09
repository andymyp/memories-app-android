import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from './theme';

const Header = ({icon, title, color, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={[theme.texts.smheader, {color: color}]}>
        {title.toUpperCase()}
      </Text>
      <Icon name={icon} size={25} color={color} onPress={onPress} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.spacing.l,
  },
});
