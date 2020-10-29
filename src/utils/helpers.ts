import {
  Animated,
  Easing,
  Dimensions,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  CarouselProps,
  getInputRangeFromIndexes,
} from 'react-native-snap-carousel';

const { width } = Dimensions.get('screen');
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

export const scrollInterpolator = (index: number, carouselProps: any) => ({
  inputRange: getInputRangeFromIndexes([1, 0, -1], index, carouselProps),
  outputRange: [1, 0, -1],
});

export const animatedStyles = (
  index: number,
  animatedValue: Animated.Value,
  carouselProps: CarouselProps<any>
): Animated.AnimatedProps<StyleProp<ViewStyle>> => ({
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
});

export const expandAnimation = (
  animations: Animated.Value[],
  finishCallback: () => any,
  { x, y, width, height, duration }
): void => {
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
