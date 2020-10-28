import React, { ReactText } from 'react';
import { Avatar } from 'react-native-elements';
import { ActivityIndicator, ViewStyle, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { styles } from './styles';

export type StoryPreviewItemProps = {
  /**
   * URL of the avatar
   */
  preview: string;
  /**
   * The onPress handler
   */
  onPress: () => void;
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
   * The colors list of the gradient border
   */
  gradientBorderColors: ReactText[];
  /**
    Coordinates that declare the position that the gradient starts
   */
  gradientBorderStart?: { x: number; y: number };
  /**
    Coordinates that declare the position that the gradient ends
   */
  gradientBorderEnd?: { x: number; y: number };
  /**
    Array of numbers that defining the location of each gradient color stop, mapping to the color with the same index in colors prop
   */
  gradientBorderLocations?: number[];
  /**
    Gradient container styles
   */
  gradientContainerStyles?: ViewStyle;
};

export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  size = 'large',
  onPress,
  preview: uri,
  containerStyle,
  placeholderStyle,
  gradientBorderColors,
  gradientBorderStart,
  gradientBorderEnd,
  gradientBorderLocations,
  gradientContainerStyles,
}) => (
  <View style={[styles.container, containerStyle]}>
    <LinearGradient
      colors={gradientBorderColors}
      start={gradientBorderStart}
      end={gradientBorderEnd}
      locations={gradientBorderLocations}
      style={[styles.gradientContainer, gradientContainerStyles]}
    >
      <Avatar
        rounded
        size={size}
        source={{ uri }}
        onPress={() => onPress()}
        placeholderStyle={placeholderStyle}
        renderPlaceholderContent={<ActivityIndicator color="#FFF" />}
      />
    </LinearGradient>
  </View>
);

StoryPreviewItem.displayName = 'StoryPreviewItem';
