import React from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { View, Animated, TouchableOpacity } from 'react-native';

import type { GradientOptions, StoryPreviewItemProps } from '../../types';

import { styles } from './styles';
import { useStoryPreviewItem } from './hook';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const defaultGradient: GradientOptions = {
  colors: ['#CA1D7E', '#E35157', '#F2703F'],
};

export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  story,
  onPress,
  containerStyle,
  shouldAnimate = true,
  gradient = defaultGradient,
}) => {
  const { scale, onLayout, onItemPress, getAvatarSource } = useStoryPreviewItem(
    {
      shouldAnimate,
      onPress,
      story,
    }
  );

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <AnimatedLinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        locations={gradient.locations}
        style={[
          styles.gradientContainer,
          gradient.style,
          {
            transform: [
              {
                scaleX: scale,
              },
              {
                scaleY: scale,
              },
            ],
          },
        ]}
      />
      <TouchableOpacity onPress={onItemPress} style={styles.avatar}>
        <FastImage
          style={styles.avatarImage}
          source={getAvatarSource(story)}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );
};
