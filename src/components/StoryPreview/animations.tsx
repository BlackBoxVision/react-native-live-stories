import { Animated, Dimensions } from 'react-native';
import React, { useRef, useImperativeHandle } from 'react';

export type StoryDetailExpanderProps = {
  /**
   * Aditional styles to add to the animated view
   */
  style?: any;
  /**
   * Children components
   */
  children?: React.ReactNode;
};

const duration = 150;
const toValue = {
  x: 0,
  y: 0,
};
const initialAnimationConfig = {
  useNativeDriver: false,
  duration,
  toValue,
};

const { width, height } = Dimensions.get('screen');

export const StoryDetailExpander = React.forwardRef<
  any,
  StoryDetailExpanderProps
>(({ style, children }, ref) => {
  const coordsRef = useRef(toValue);
  const animatedWidthHeightRef = useRef(new Animated.ValueXY(toValue));
  const animatedCoordinatesRef = useRef(new Animated.ValueXY(toValue));

  useImperativeHandle(ref, () => ({
    startExpandAnimation: (coords: any, callback: any) => {
      animatedCoordinatesRef.current.setValue(coords);
      coordsRef.current = coords;

      const scaleWidthHeightAnimation = Animated.timing(
        animatedWidthHeightRef.current,
        {
          useNativeDriver: false,
          duration,
          toValue: {
            x: width,
            y: height,
          },
        }
      );

      const changeXYPosition = Animated.timing(
        animatedCoordinatesRef.current,
        initialAnimationConfig
      );

      changeXYPosition.start();
      scaleWidthHeightAnimation.start(({ finished }) => {
        if (finished) {
          callback && callback();
        }
      });
    },
    resetExpandAnimation: (callback: any) => {
      const inverseWidthHeightAnimation = Animated.timing(
        animatedWidthHeightRef.current,
        initialAnimationConfig
      );

      const changeXYPosition = Animated.timing(animatedCoordinatesRef.current, {
        useNativeDriver: false,
        duration,
        toValue: {
          x: coordsRef.current.x,
          y: coordsRef.current.y,
        },
      });

      changeXYPosition.start();
      inverseWidthHeightAnimation.start(({ finished }) => {
        if (finished) {
          callback && callback();
        }
      });
    },
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          position: 'absolute',
          backgroundColor: '#000000',
          top: animatedCoordinatesRef.current.y,
          left: animatedCoordinatesRef.current.x,
          width: animatedWidthHeightRef.current.x,
          height: animatedWidthHeightRef.current.y,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
});
