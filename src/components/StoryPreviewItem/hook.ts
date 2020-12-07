import { Animated } from 'react-native';
import { useState } from 'react';

import { heartbeatAnimation } from '../../animations/heartbeat';

import type { Coords, Story, StoryPreviewItemProps } from '../../types';

export const useStoryPreviewItem = ({
  shouldAnimate,
  onPress,
  story,
}: StoryPreviewItemProps) => {
  const [scale] = useState<Animated.Value>(new Animated.Value(1));
  const [coords, setCoords] = useState<Coords>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;

    if (shouldAnimate) {
      heartbeatAnimation(scale, 1 - 0.01, 1 + 0.01);
    }

    const avatarMiddleSize = width / 2;

    setCoords({
      x: x + avatarMiddleSize,
      y: y + width,
      width,
      height,
    });
  };

  const onItemPress = () => {
    onPress && onPress(story!, coords);
  };

  const getAvatarSource = (currentStory?: Story): any => {
    if (typeof currentStory?.preview === 'string') {
      return {
        uri: currentStory?.preview,
      };
    }

    return currentStory?.preview;
  };

  return {
    scale,
    onLayout,
    onItemPress,
    getAvatarSource,
  };
};
