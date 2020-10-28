import React, { useRef, useImperativeHandle } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import { expandAnimation } from '../../utils/helpers';

export type StoryDetailExpanderProps = {
  /**
   * The duration of the animation
   */
  duration?: number;
  /**
   * Aditional styles to add to the animated view
   */
  style?: any;
  /**
   * Children components
   */
  children?: React.ReactNode;
};

const { width, height } = Dimensions.get('screen');

export const StoryDetailExpander = React.forwardRef<
  any,
  StoryDetailExpanderProps
>(({ style, children, duration = 200 }, ref) => {
  const coordsRef = useRef({ x: 0, y: 0 });

  const scaleXRef = useRef(new Animated.Value(0));
  const scaleYRef = useRef(new Animated.Value(0));

  const translateXRef = useRef(new Animated.Value(0));
  const translateYRef = useRef(new Animated.Value(0));

  useImperativeHandle(ref, () => ({
    startExpandAnimation: (coords: any, finishCallback: any) => {
      translateXRef.current.setValue(coords.x);
      translateYRef.current.setValue(coords.y);

      coordsRef.current = coords;

      const animations = [
        scaleXRef.current,
        scaleYRef.current,
        translateXRef.current,
        translateYRef.current,
      ];

      expandAnimation(animations, finishCallback, {
        x: 0,
        y: 0,
        width,
        height,
        duration,
      });
    },
    resetExpandAnimation: (finishCallback: any) => {
      const animations = [
        scaleXRef.current,
        scaleYRef.current,
        translateXRef.current,
        translateYRef.current,
      ];

      expandAnimation(animations, finishCallback, {
        x: coordsRef.current.x,
        y: coordsRef.current.y,
        width: 0,
        height: 0,
        duration,
      });
    },
  }));

  return (
    <Animated.View
      style={[
        style,
        StyleSheet.absoluteFillObject,
        {
          width: 10,
          height: 10,
          backgroundColor: '#000000',
        },
        {
          transform: [
            {
              translateX: translateXRef.current,
            },
            {
              translateY: translateYRef.current,
            },
            {
              scaleX: scaleXRef.current,
            },
            {
              scaleY: scaleYRef.current,
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
});
