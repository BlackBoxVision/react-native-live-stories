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
   * The options of the linear gradient border
   */
  gradient: {
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
    styles?: ViewStyle;
  };
};

export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  size = 'large',
  onPress,
  preview: uri,
  containerStyle,
  placeholderStyle,
  gradient = { colors: ['#CA1D7E', '#E35157', '#F2703F'] },
}) => (
  <View style={[styles.container, containerStyle]}>
    <LinearGradient
      colors={gradient.colors}
      start={gradient.start}
      end={gradient.end}
      locations={gradient.locations}
      style={[styles.gradientContainer, gradient.styles]}
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
