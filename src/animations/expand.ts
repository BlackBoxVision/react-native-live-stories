import { Animated, Easing } from 'react-native';

export const expandAnimation = (
  animations: Animated.Value[],
  finishCallback: () => any,
  { x, y, width, height, duration }
): void => {
  const [scaleX, scaleY, translateX, translateY] = animations;

  Animated.parallel([
    Animated.timing(scaleX, {
      easing: Easing.linear,
      useNativeDriver: true,
      toValue: width,
      duration,
    }),
    Animated.timing(scaleY, {
      easing: Easing.linear,
      useNativeDriver: true,
      toValue: height,
      duration,
    }),
    Animated.timing(translateX, {
      easing: Easing.linear,
      useNativeDriver: true,
      toValue: x,
      duration,
    }),
    Animated.timing(translateY, {
      easing: Easing.linear,
      useNativeDriver: true,
      toValue: y,
      duration,
    }),
  ]).start(({ finished }) => {
    if (finished && finishCallback) {
      finishCallback();
    }
  });
};
