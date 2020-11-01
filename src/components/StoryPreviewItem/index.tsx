import { Avatar } from 'react-native-elements';
import React, { useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator, View, Animated } from 'react-native';

import type {
  Coords,
  GradientOptions,
  StoryPreviewItemProps,
} from '../../types';

import { heartbeatAnimation } from '../../animations/heartbeat';
import { styles } from './styles';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const defaultGradient: GradientOptions = {
  colors: ['#CA1D7E', '#E35157', '#F2703F'],
};

export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  story,
  onPress,
  containerStyle,
  placeholderStyle,
  gradient = defaultGradient,
  shouldAnimate = true,
}) => {
  const [scale, setScale] = useState(new Animated.Value(1));
  const coordinatesRef = useRef<Coords>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  return (
    <View
      style={[styles.container, containerStyle]}
      onLayout={(event) => {
        const avatarMiddleSize = event.nativeEvent.layout.width / 2;

        coordinatesRef.current = {
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
          x: event.nativeEvent.layout.x + avatarMiddleSize,
          y: event.nativeEvent.layout.y + avatarMiddleSize,
        };

        const sizeScale = (coordinatesRef.current.width ?? 0) / 100;

        if (shouldAnimate) {
          heartbeatAnimation(scale, sizeScale - 0.01, sizeScale + 0.05);
        } else {
          setScale(new Animated.Value(sizeScale));
        }
      }}
    >
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
      <Avatar
        rounded
        size={78}
        containerStyle={styles.avatar}
        source={{ uri: story.preview }}
        placeholderStyle={placeholderStyle}
        onPress={() => onPress(story, coordinatesRef.current)}
        renderPlaceholderContent={<ActivityIndicator color="#FFF" />}
      />
    </View>
  );
};
