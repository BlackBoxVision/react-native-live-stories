import React from 'react';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

import { StoryDetailItemLayout } from '../Layout';

import { styles } from './styles';

export type StoryDetailItemLoadingProps = {
  /**
   * Prop to display loading
   */
  isVisible: boolean;
  /**
   * Prop with a callback to go back
   */
  goBack: () => any;
  /**
   * The header of the loading
   */
  header?: React.ReactNode;
  /**
   * The footer of the loading
   */
  footer?: React.ReactNode;
};

export const StoryDetailItemLoading = ({
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

StoryDetailItemLoading.diplayName = 'StoryDetailItemLoading';
