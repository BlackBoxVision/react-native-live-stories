import React from 'react';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

import type { StoryDetailItemLoadingProps } from '../../../types';

import { StoryDetailItemLayout } from '../Layout';

import { styles } from './styles';

export const StoryDetailItemLoading: React.FC<StoryDetailItemLoadingProps> = ({
  isVisible,
  goBack,
  header,
  footer,
}) => (
  <Overlay
    fullScreen
    isVisible={isVisible}
    onBackdropPress={goBack}
    overlayStyle={styles.container}
  >
    <StoryDetailItemLayout
      header={header}
      content={
        <ActivityIndicator animating color="#FFFFFF" style={styles.indicator} />
      }
      footer={footer}
    />
  </Overlay>
);

StoryDetailItemLoading.displayName = 'StoryDetailItemLoading';
