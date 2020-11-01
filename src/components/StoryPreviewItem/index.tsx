import React from 'react';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator, View, Animated } from 'react-native';

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
  placeholderStyle,
  shouldAnimate = true,
  gradient = defaultGradient,
}) => {
  const { scaleRef, containerRef, coordinatesRef } = useStoryPreviewItem({
    shouldAnimate,
  });

  return (
    <View ref={containerRef} style={[styles.container, containerStyle]}>
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
                scaleX: scaleRef.current,
              },
              {
                scaleY: scaleRef.current,
              },
            ],
          },
        ]}
      />
      <Avatar
        rounded
        size={78}
        containerStyle={styles.avatar}
        source={{ uri: story?.preview }}
        placeholderStyle={placeholderStyle}
        onPress={() => onPress && onPress(story!, coordinatesRef.current)}
        renderPlaceholderContent={<ActivityIndicator color="#FFF" />}
      />
    </View>
  );
};
