import { Animated, Easing } from 'react-native';

export const heartbeatAnimation = (
  value: Animated.Value,
  minValue: number,
  maxValue: number
) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        easing: Easing.ease,
        useNativeDriver: true,
        toValue: maxValue,
        duration: 100,
      }),
      Animated.timing(value, {
        easing: Easing.ease,
        useNativeDriver: true,
        toValue: minValue,
        duration: 100,
      }),
      Animated.timing(value, {
        easing: Easing.ease,
        useNativeDriver: true,
        toValue: maxValue,
        duration: 100,
      }),
      Animated.timing(value, {
        easing: Easing.ease,
        useNativeDriver: true,
        toValue: minValue,
        duration: 2000,
      }),
    ])
  ).start();
};
