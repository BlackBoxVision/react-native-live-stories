import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

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
                StoryDetailItemHeader={StoryDetailItemHeader}
                StoryDetailItemFooter={StoryDetailItemFooter}
                onBackPress={() => onBackPress(idx)}
                onTapLeft={() => {
                  setTimeout(
                    () =>
                      carouselRef.current &&
                      carouselRef.current.snapToItem(idx - 1, false, false),
                    250
                  );
                }}
                onTapRight={() => {
                  setTimeout(
                    () =>
                      carouselRef.current &&
                      carouselRef.current.snapToItem(idx + 1, false, false),
                    250
                  );
                }}
                onVideoEnd={() => {
                  if (idx <= stories.length - 2) {
                    requestAnimationFrame(() => {
                      carouselRef.current &&
                        carouselRef.current.snapToItem(idx + 1, false, false);
                    });
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
