import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import type {
  StoryDetailExpanderRefProps,
  StoryDetailProps,
} from '../../types';

import { StoryDetailExpander } from './Expander';

import * as cubeEffect from '../../animations/cube';

import { styles } from './styles';
import { useStoryDetail } from './hook';

const { width } = Dimensions.get('screen');

const noopCallback = () => {};

export const StoryDetail = React.forwardRef<
  StoryDetailExpanderRefProps,
  StoryDetailProps
>(
  (
    {
      initial,
      stories,
      isVisible,
      onBackPress,
      animated = false,
      onMoveToNextStory,
      StoryDetailItemFooter,
      StoryDetailItemHeader,
    },
    ref
  ) => {
    const { onBackDropPress, renderStoryDetailItem } = useStoryDetail({
      initial,
      stories,
      onBackPress,
      StoryDetailItemHeader,
      StoryDetailItemFooter,
    } as any);

    const carouselRef: any = useRef(null);

    return (
      <StoryDetailExpander ref={ref} isVisible={animated}>
        <Overlay
          fullScreen
          animationType="none"
          isVisible={isVisible}
          onBackdropPress={onBackDropPress}
          overlayStyle={styles.overlayContainer}
        >
          <Carousel
            data={stories}
            ref={carouselRef}
            itemWidth={width}
            sliderWidth={width}
            firstItem={initial}
            initialScrollIndex={initial}
            onSnapToItem={onMoveToNextStory}
            renderItem={renderStoryDetailItem}
            onScrollToIndexFailed={noopCallback}
            scrollInterpolator={cubeEffect.scrollInterpolator}
            slideInterpolatedStyle={cubeEffect.animatedStyles as any}
          />
        </Overlay>
      </StoryDetailExpander>
    );
  }
);
