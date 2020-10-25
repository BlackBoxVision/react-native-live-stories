import { useState } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const perspective = width;
const ratio = Platform.OS === 'ios' ? 2 : 1.2;
const angle = Math.atan(perspective / (width / 2));

export const useStoryDetail = (scrollRef) => {
  const [x] = useState(new Animated.Value(0));

  const getStyle = (idx) => {
    const offset = idx * width;
    const inputRange = [offset - width, offset + width];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: Extrapolate.CLAMP,
    });

    const rotateY = x.interpolate({
      inputRange,
      outputRange: [angle, -angle],
      extrapolate: Extrapolate.CLAMP,
    });

    const alpha = Animated.abs(rotateY);
    const gamma = Animated.sub(angle, alpha);
    const beta = Animated.sub(Math.PI, alpha, gamma);

    const w = Animated.sub(
      width / 2,
      Animated.multiply(
        width / 2,
        Animated.divide(Animated.sin(gamma), Animated.sin(beta))
      )
    );

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective },
        { translateX },
        { rotateY: Animated.concat(rotateY, 'rad') },
        {
          translateX: Animated.cond(
            Animated.greaterThan(rotateY, 0),
            w,
            Animated.multiply(w, -1)
          ),
        },
      ],
    };
  };

  const getMaskStyle = (idx) => {
    const offset = idx * width;
    const inputRange = [offset - width, offset, offset + width];
    const opacity = x.interpolate({
      inputRange,
      outputRange: [0.75, 0, 0.75],
      extrapolate: Extrapolate.CLAMP,
    });

    return {
      backgroundColor: 'black',
      ...StyleSheet.absoluteFillObject,
      opacity,
    };
  };

  const next = (idx) => {
    scrollRef.current.getNode().scrollTo({
      x: (idx + 1) * width,
      animated: true,
    });
  };

  const prev = (idx) => {
    scrollRef.current.getNode().scrollTo({
      x: (idx - 1) * width,
      animated: true,
    });
  };

  return {
    x,
    prev,
    next,
    width,
    getStyle,
    getMaskStyle,
  };
};
