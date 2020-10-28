import { Animated, Easing } from 'react-native';

export const expandAnimation = (
  animations,
  finishCallback,
  { x, y, width, height, duration }
) => {
  const [scaleX, scaleY, translateX, translateY] = animations;

  Animated.parallel([
    Animated.timing(scaleX, {
      useNativeDriver: true,
      easing: Easing.ease,
      toValue: width,
      duration,
    }),
    Animated.timing(scaleY, {
      useNativeDriver: true,
      easing: Easing.ease,
      toValue: height,
      duration,
    }),
    Animated.timing(translateX, {
      useNativeDriver: true,
      easing: Easing.ease,
      toValue: x,
      duration,
    }),
    Animated.timing(translateY, {
      useNativeDriver: true,
      easing: Easing.ease,
      toValue: y,
      duration,
    }),
  ]).start(({ finished }) => {
    if (finished && finishCallback) {
      finishCallback();
    }
  });
};
