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
    {content}
    <TouchableWithoutFeedback
      onPress={() => {
        typeof onTapLeft === 'function' && onTapLeft();
      }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#DDD',
          padding: 10,
        }}
      >
        <Text>Go left</Text>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback
      onPressIn={() => {
        typeof onTapRight === 'function' && onTapRight();
      }}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#DDD',
          padding: 10,
          marginTop: 32,
        }}
      >
        <Text>Go right</Text>
      </View>
    </TouchableWithoutFeedback>
    <View style={styles.header}>{header}</View>
    <View style={styles.footer}>{footer}</View>
  </View>
);

StoryDetailItemLayout.displayName = 'StoryDetailItemLayout';
