import React, { useRef } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type { StoryDetailItemLayoutProps } from '../../../types';

import { styles } from './styles';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const defaultGradient = {
  locations: [0, 0.5, 0.8, 0.9],
  colors: ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', '#FFFFFF00'],
};

export const StoryDetailItemLayout: React.FC<StoryDetailItemLayoutProps> = ({
  header,
  content,
  footer,
  onTapLeft,
  onTapRight,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
    } as Animated.TimingAnimationConfig).start();

  const fadeOut = () =>
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
    } as Animated.TimingAnimationConfig).start();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPressIn={fadeIn} onPressOut={fadeOut}>
        <AnimatedLinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.left,
            {
              opacity: fadeAnim,
            },
          ]}
          locations={defaultGradient.locations}
          colors={defaultGradient.colors}
        />
      </TouchableWithoutFeedback>
      {content}
      {/* <TouchableWithoutFeedback onPress={onTapRight}>
      <View style={styles.right} />
    </TouchableWithoutFeedback> */}
      <View style={styles.header}>{header}</View>
      <View style={styles.footer}>{footer}</View>
    </View>
  );
};

StoryDetailItemLayout.displayName = 'StoryDetailItemLayout';
