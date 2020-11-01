import React from 'react';
import { View } from 'react-native';

import type { StoryDetailItemLayoutProps } from '../../../types';

import { styles } from './styles';

export const StoryDetailItemLayout: React.FC<StoryDetailItemLayoutProps> = ({
  header,
  content,
  footer,
}) => (
  <View style={styles.container}>
    {content}
    <View style={styles.header}>{header}</View>
    <View style={styles.footer}>{footer}</View>
  </View>
);

StoryDetailItemLayout.displayName = 'StoryDetailItemLayout';
