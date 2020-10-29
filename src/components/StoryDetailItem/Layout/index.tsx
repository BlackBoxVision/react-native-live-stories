import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

export type StoryDetailItemLayoutProps = {
  /**
   * The header component
   */
  header?: React.ReactNode;
  /**
   * The content component
   */
  content?: React.ReactNode;
  /**
   * The footer component
   */
  footer?: React.ReactNode;
};

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
