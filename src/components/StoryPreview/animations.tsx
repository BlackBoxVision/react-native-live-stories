import React, { useRef, useImperativeHandle } from 'react';
import { useState } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

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

const size = 0;
const duration = 200;
const defaultAnimationConfig = {
  useNativeDriver: false,
  duration,
};

export const StoryDetailExpander = React.forwardRef<
  any,
  StoryDetailExpanderProps
>(({ style, children }, ref) => {
  const animatedHeightRef = useRef(new Animated.Value(size));
  const animatedWidthRef = useRef(new Animated.Value(size));

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    startExpandAnimation: (coords: any, callback: any) => {
      setCoordinates(coords);

      const scaleHeightAnimation = Animated.timing(animatedHeightRef.current, {
        ...defaultAnimationConfig,
        toValue: height,
      });

      const scaleWidthAnimation = Animated.timing(animatedWidthRef.current, {
        ...defaultAnimationConfig,
        toValue: width,
      });

      scaleHeightAnimation.start(() => callback && callback());
      scaleWidthAnimation.start(() => callback && callback());
    },
    resetExpandAnimation: (callback: any) => {
      const inverseHeightAnimation = Animated.timing(
        animatedHeightRef.current,
        {
          ...defaultAnimationConfig,
          toValue: size,
        }
      );

      const inverseWidthAnimation = Animated.timing(animatedWidthRef.current, {
        ...defaultAnimationConfig,
        toValue: size,
      });

      inverseHeightAnimation.start(() => callback && callback());
      inverseWidthAnimation.start(() => callback && callback());
    },
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          top: coordinates.y,
          left: coordinates.x,
          position: 'absolute',
          backgroundColor: '#000000',
          width: animatedWidthRef.current,
          height: animatedHeightRef.current,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
});

StoryDetailExpander.displayName = 'StoryDetailExpander';
