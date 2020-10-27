import React from 'react';
import { Avatar } from 'react-native-elements';
import { ActivityIndicator, ViewStyle } from 'react-native';

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
};

export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  size = 'medium',
  onPress,
  preview: uri,
  containerStyle,
  placeholderStyle,
}) => (
  <Avatar
    rounded
    size={size}
    source={{ uri }}
    onPress={() => onPress()}
    placeholderStyle={placeholderStyle}
    containerStyle={[styles.container, containerStyle]}
    renderPlaceholderContent={<ActivityIndicator color="#FFFFFF" />}
  />
);

StoryPreviewItem.displayName = 'StoryPreviewItem';
