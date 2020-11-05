import { Animated } from 'react-native';
import { useState, useCallback } from 'react';

import { heartbeatAnimation } from '../../animations/heartbeat';

import type { Coords, Story, StoryPreviewItemProps } from '../../types';

export const useStoryPreviewItem = ({
  shouldAnimate,
  onPress,
  story,
}: StoryPreviewItemProps) => {
  const [scale, setScale] = useState<Animated.Value>(new Animated.Value(1));
  const [coords, setCoords] = useState<Coords>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = useCallback(
    (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;

      if (shouldAnimate) {
        heartbeatAnimation(scale, 1 - 0.01, 1 + 0.01);
      } else {
        const sizeScale = width / 100;
        setScale(new Animated.Value(sizeScale + 0.13));
      }

      const avatarMiddleSize = width / 2;

      setCoords({
        x: x + avatarMiddleSize,
        y: y + width,
        width,
        height,
      });
    },
    [scale, shouldAnimate]
  );

  const onItemPress = useCallback(() => {
    onPress && onPress(story!, coords);
  }, [story, coords, onPress]);

  const getAvatarSource = useCallback((story?: Story): any => {
    if (typeof story?.preview === 'string') {
      return {
        uri: story?.preview,
      };
    }

    return story?.preview;
  }, []);

  return {
    scale,
    onLayout,
    onItemPress,
    getAvatarSource,
  };
};
