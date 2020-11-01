import React, { useRef } from 'react';
import { Overlay } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, Platform } from 'react-native';

import type {
  StoryDetailExpanderRefProps,
  StoryDetailProps,
} from '../../types';

import { StoryDetailExpander } from './Expander';
import { StoryDetailItem } from '../StoryDetailItem';

import * as cubeEffect from '../../animations/cube';

import { styles } from './styles';

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
    const carouselRef: any = useRef(null);

    return (
      <StoryDetailExpander ref={ref} isVisible={animated}>
        <Overlay
          fullScreen
          animationType="none"
          isVisible={isVisible}
          overlayStyle={styles.overlayContainer}
          onBackdropPress={() => onBackPress(initial)}
        >
          <Carousel
            data={stories}
            ref={carouselRef}
            itemWidth={width}
            sliderWidth={width}
            firstItem={initial}
            initialScrollIndex={initial}
            onSnapToItem={onMoveToNextStory}
            onScrollToIndexFailed={noopCallback}
            scrollInterpolator={cubeEffect.scrollInterpolator}
            slideInterpolatedStyle={cubeEffect.animatedStyles as any}
            renderItem={({ item: story, index: idx }) => (
              <StoryDetailItem
                story={story}
                isCurrentStory={initial === idx}
                StoryDetailItemFooter={StoryDetailItemFooter}
                StoryDetailItemHeader={StoryDetailItemHeader}
                onBackPress={() => onBackPress(idx)}
                onVideoEnd={() => {
                  if (idx <= stories.length - 2) {
                    setTimeout(
                      () => carouselRef.current.snapToItem(idx + 1, true, true),
                      Platform.OS === 'ios' ? 25 : 0
                    );
                  } else {
                    onBackPress(idx);
                  }
                }}
              />
            )}
          />
        </Overlay>
      </StoryDetailExpander>
    );
  }
);
