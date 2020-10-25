import React from 'react';
import { Avatar } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

import { styles } from './styles';

export type StoryPreviewItemProps = {
  id: string;
  size: string;
  preview: string;
  viewed: boolean;
  onPress: any;
};

// TODO: extract to props
const colors = {
  primary: '#5D8FDB',
  lightPrimary: 'rgb(233,240,251)',
  secondary: '#5E5E5E',
  storyBorder: '#D3D3D3',
  lightSecondary: 'rgb(211,211,211)',
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)',
  facebook: '#3b5998',
  red: 'red',
};

export const StoryPreviewItem: React.FC<StoryPreviewItemProps> = ({
  id,
  preview,
  viewed,
  onPress,
}) => {
  return (
    <Avatar
      size="medium"
      source={{
        uri: preview,
      }}
      containerStyle={{
        ...styles.container,
        borderColor: viewed ? colors.storyBorder : colors.red,
      }}
      onPress={() => {
        if (typeof onPress === 'function') {
          onPress(id);
        }
      }}
      renderPlaceholderContent={<ActivityIndicator color={colors.white} />}
      placeholderStyle={styles.placeholder}
      rounded
    />
  );
};

StoryPreviewItem.displayName = 'StoryPreviewItem';
