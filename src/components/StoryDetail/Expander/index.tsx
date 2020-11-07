import React, { useRef, useImperativeHandle } from 'react';
import { Animated, Dimensions, Modal, StyleSheet } from 'react-native';

import type {
  Coords,
  OnAnimationEndCallback,
  StoryDetailExpanderProps,
  StoryDetailExpanderRefProps,
} from '../../../types';

import { expandAnimation } from '../../../animations/expand';

import { styles } from './styles';

const { width, height } = Dimensions.get('screen');

export const StoryDetailExpander = React.forwardRef<
  StoryDetailExpanderRefProps,
  StoryDetailExpanderProps
>(({ style, children, duration = 200, isVisible }, ref) => {
  const coordsRef = useRef<Coords>({
    x: 0,
    y: 0,
  });

  const scaleXRef = useRef<Animated.Value>(new Animated.Value(0));
  const scaleYRef = useRef<Animated.Value>(new Animated.Value(0));

  const translateXRef = useRef<Animated.Value>(new Animated.Value(0));
  const translateYRef = useRef<Animated.Value>(new Animated.Value(0));

  useImperativeHandle(ref, () => ({
    startExpandAnimation: (
      coords: Coords,
      onAnimationEnd: OnAnimationEndCallback
    ) => {
      translateXRef.current.setValue(coords.x);
      translateYRef.current.setValue(coords.y);

      coordsRef.current = coords;

      const animations = [
        scaleXRef.current,
        scaleYRef.current,
        translateXRef.current,
        translateYRef.current,
      ];

      expandAnimation(animations, onAnimationEnd, {
        x: 0,
        y: 0,
        width,
        height,
        duration,
      });
    },
    resetExpandAnimation: (onAnimationEnd: OnAnimationEndCallback) => {
      const animations = [
        scaleXRef.current,
        scaleYRef.current,
        translateXRef.current,
        translateYRef.current,
      ];

      expandAnimation(animations, onAnimationEnd, {
        x: coordsRef.current.x,
        y: coordsRef.current.y,
        width: 0,
        height: 0,
        duration,
      });
    },
  }));

  return (
    <Modal visible={isVisible} transparent>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.container,
          style,
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
    </Modal>
  );
});

StoryDetailExpander.displayName = 'StoryDetailExpander';
