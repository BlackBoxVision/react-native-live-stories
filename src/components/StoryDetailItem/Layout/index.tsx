import React, { useRef } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { fadeIn, fadeOut } from '../../../animations/fade';
import type { StoryDetailItemLayoutProps } from '../../../types';

import { styles } from './styles';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const defaultGradient = {
  locations: [0, 0.5, 0.8, 0.9],
  colors: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)', '#FFFFFF00'],
};

export const StoryDetailItemLayout: React.FC<StoryDetailItemLayoutProps> = ({
  header,
  content,
  footer,
  onTapLeft,
  onTapRight,
}) => {
  const fadeLeftAnim = useRef(new Animated.Value(0)).current;
  const fadeRightAnim = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={() => fadeIn(fadeLeftAnim)}
        onPressOut={() => {
          fadeOut(fadeLeftAnim, ({ finished }) => {
            if (finished) {
              onTapLeft && onTapLeft();
            }
          });
        }}
      >
        <AnimatedLinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.left,
            {
              opacity: fadeLeftAnim,
            },
          ]}
          locations={defaultGradient.locations}
          colors={defaultGradient.colors}
        />
      </TouchableWithoutFeedback>
      {content}
      <TouchableWithoutFeedback
        onPressIn={() => fadeIn(fadeRightAnim)}
        onPressOut={() => {
          fadeOut(fadeRightAnim, ({ finished }) => {
            if (finished) {
              onTapRight && onTapRight();
            }
          });
        }}
      >
        <AnimatedLinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[
            styles.right,
            {
              opacity: fadeRightAnim,
            },
          ]}
          locations={defaultGradient.locations}
          colors={defaultGradient.colors}
        />
      </TouchableWithoutFeedback>
      <View style={styles.header}>{header}</View>
      <View style={styles.footer}>{footer}</View>
    </View>
  );
};

StoryDetailItemLayout.displayName = 'StoryDetailItemLayout';
