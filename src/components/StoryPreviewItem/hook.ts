import { View, Animated } from 'react-native';
import { useRef, useEffect, MutableRefObject } from 'react';

import { heartbeatAnimation } from '../../animations/heartbeat';

import type { Coords, StoryPreviewItemProps } from 'src/types';

export const useStoryPreviewItem = ({
  shouldAnimate,
}: StoryPreviewItemProps) => {
  const scaleRef: MutableRefObject<Animated.Value> = useRef(
    new Animated.Value(1)
  );

  const containerRef: MutableRefObject<View | null> = useRef<View | null>(null);
  const coordinatesRef = useRef<Coords>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    containerRef.current?.measureInWindow((x, y, width, height) => {
      const avatarMiddleSize = width / 2;

      x = x + avatarMiddleSize;
      y = y + avatarMiddleSize;

      coordinatesRef.current = {
        x,
        y,
        width,
        height,
      };

      if (shouldAnimate) {
        heartbeatAnimation(scaleRef.current, 1 - 0.01, 1 + 0.05);
      }
    });
  }, [scaleRef, containerRef, shouldAnimate]);

  return {
    scaleRef,
    containerRef,
    coordinatesRef,
  };
};
