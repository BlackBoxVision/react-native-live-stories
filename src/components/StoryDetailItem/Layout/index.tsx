import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';

import type { StoryDetailItemLayoutProps } from '../../../types';

import { styles } from './styles';

export const StoryDetailItemLayout: React.FC<StoryDetailItemLayoutProps> = ({
  header,
  content,
  footer,
  onTapLeft,
  onTapRight,
}) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={onTapLeft}>
      <View style={styles.left} />
    </TouchableWithoutFeedback>
    {content}
    <TouchableWithoutFeedback onPress={onTapRight}>
      <View style={styles.right} />
    </TouchableWithoutFeedback>
    <View style={styles.header}>{header}</View>
    <View style={styles.footer}>{footer}</View>
  </View>
);

StoryDetailItemLayout.displayName = 'StoryDetailItemLayout';
