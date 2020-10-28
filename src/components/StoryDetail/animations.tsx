import { Dimensions, Platform } from 'react-native';
import { getInputRangeFromIndexes } from 'react-native-snap-carousel';

export function scrollInterpolator(index, carouselProps) {
  const range = [1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;

  return {
    inputRange,
    outputRange,
  };
}

const { width } = Dimensions.get('screen');
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

export function animatedStyles(index, animatedValue, carouselProps) {
  return {
    zIndex: carouselProps.data.length - index,
    transform: [
      {
        perspective: width,
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [-width, 0, width],
          outputRange: [width / ratio, 0, -width / ratio],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [0.7, 1, 0.7],
          extrapolate: 'clamp',
        }),
      },
      {
        rotateY: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: ['-30deg', '0deg', '30deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
}
