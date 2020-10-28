import { Avatar } from 'react-native-elements';
import React, { ReactText, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator, ViewStyle, View } from 'react-native';

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
   * URL of the avatar
   */
  preview: string;
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
};

const defaultGradient: GradientOptions = {
  colors: ['#CA1D7E', '#E35157', '#F2703F'],
};

export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  size = 'large',
  onPress,
  preview: uri,
  containerStyle,
  placeholderStyle,
  gradient = defaultGradient,
}) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  return (
    <View
      style={[styles.container, containerStyle]}
      onLayout={(event) =>
        setCoordinates({
          x: event.nativeEvent.layout.x,
          y: 78 / 2,
        })
      }
    >
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        locations={gradient.locations}
        style={[styles.gradientContainer, gradient.style]}
      >
        <Avatar
          rounded
          size={size}
          source={{ uri }}
          placeholderStyle={placeholderStyle}
          onPress={() => onPress(coordinates)}
          renderPlaceholderContent={<ActivityIndicator color="#FFF" />}
        />
      </LinearGradient>
    </View>
  );
};

StoryPreviewItem.displayName = 'StoryPreviewItem';
