import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import React, { ReactText, useRef, useState } from 'react';
import { ActivityIndicator, ViewStyle, View, Animated } from 'react-native';

import type { Story } from '../StoryDetail';

import { heartbeatAnimation } from '../../animations/heartbeat';

import { styles } from './styles';

export type GradientOptions = {
  /**
   * The colors list of the gradient border
   */
  colors: ReactText[];
  /**
   * Coordinates that declare the position that the gradient starts
   */
  start?: { x: number; y: number };
  /**
   * Coordinates that declare the position that the gradient ends
   */
  end?: { x: number; y: number };
  /**
   * Array of numbers that defining the location of each gradient color stop, mapping to the color with the same index in colors prop
   */
  locations?: number[];
  /**
   * Gradient container styles
   */
  style?: ViewStyle;
};

export type StoryPreviewItemProps = {
  /**
   * The Story information
   */
  story: Story;
  /**
   * The onPress handler
   */
  onPress: (props: any) => void;
  /**
   * The styles to be applied to the container
   */
  containerStyle?: ViewStyle;
  /**
   * The styles to be applied to the placeholder
   */
  placeholderStyle?: ViewStyle;
  /**
   * The size of the Avatar component
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  /**
   * The options of the linear gradient border
   */
  gradient?: GradientOptions;
  /**
   * Boolean used to set if story preview item must be rendered with animation and gradient border
   */
  shouldAnimate?: boolean;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const defaultGradient: GradientOptions = {
  colors: ['#CA1D7E', '#E35157', '#F2703F'],
};

// TODO: dynamic calculate the best size for the LinearGradient based on the Avatar width/height constraints obtained via onLayout event
export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  story,
  onPress,
  containerStyle,
  placeholderStyle,
  gradient = defaultGradient,
  shouldAnimate = true,
}) => {
  const [scale, setScale] = useState(new Animated.Value(1));
  const coordinatesRef = useRef({
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

        const sizeScale = coordinatesRef.current.width / 100;

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
        onPress={() => onPress(coordinatesRef.current)}
        renderPlaceholderContent={<ActivityIndicator color="#FFF" />}
      />
    </View>
  );
};
