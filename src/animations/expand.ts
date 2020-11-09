import { Animated, Easing } from 'react-native';

export const expandAnimation = (
  animations: Animated.Value[],
  finishCallback: Animated.EndCallback,
  { x, y, width, height, duration }
): void => {
  const [scaleX, scaleY, translateX, translateY] = animations;

  Animated.parallel([
    Animated.timing(scaleX, {
      easing: Easing.ease,
      useNativeDriver: true,
      toValue: width,
      duration,
    }),
    Animated.timing(scaleY, {
      easing: Easing.ease,
      useNativeDriver: true,
      toValue: height,
      duration,
    }),
    Animated.timing(translateX, {
      easing: Easing.ease,
      useNativeDriver: true,
      toValue: x,
      duration,
    }),
    Animated.timing(translateY, {
      easing: Easing.ease,
      useNativeDriver: true,
      toValue: y,
      duration,
    }),
  ]).start(finishCallback);
};
