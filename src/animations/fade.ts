import { Animated } from 'react-native';

import type { EndCallback } from '../types';

export const fadeIn = (value: Animated.Value, finishCallback?: EndCallback) =>
  Animated.timing(value, {
    toValue: 1,
    duration: 50,
    useNativeDriver: true,
  } as Animated.TimingAnimationConfig).start(finishCallback);

export const fadeOut = (value: Animated.Value, finishCallback?: EndCallback) =>
  Animated.timing(value, {
    toValue: 0,
    duration: 50,
    useNativeDriver: true,
  } as Animated.TimingAnimationConfig).start(finishCallback);
