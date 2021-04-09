import React from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

import theme from './theme';

const {width, height} = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.title}>
        <Animatable.Text
          animation="bounceIn"
          duration={2000}
          delay={500}
          style={theme.texts.header}>
          Memories.
        </Animatable.Text>
      </View>
      <LottieView
        source={require('../assets/json/loading-animation.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: width,
  },
  title: {
    top: -40,
  },
});
