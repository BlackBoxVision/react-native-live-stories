import { Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import React, { useEffect, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';

import {
  StoryDetailFooterProps,
  StoryDetailHeaderProps,
  StoryDetailItem,
} from '../StoryDetailItem';

import * as instaEffect from './animations';

import { styles } from './styles';

export type Story = {
  id: string | number | any;
  video: string;
  preview: string;
  viewed: boolean;
};

export type StoreDetailProps = {
  initial: number;
  stories: Story[];
  isVisible: boolean;
  onBackPress: (idx: number) => any;
  onMoveToNextStory: (idx: number) => any;
  StoryDetailItemHeader?: (
    props?: StoryDetailHeaderProps
  ) => React.ReactElement | null;
  StoryDetailItemFooter?: (
    props?: StoryDetailFooterProps
  ) => React.ReactElement | null;
};

const { width } = Dimensions.get('screen');

export const StoryDetail: React.FC<StoreDetailProps> = ({
  initial,
  stories,
  isVisible,
  onBackPress,
  onMoveToNextStory,
  StoryDetailItemFooter,
  StoryDetailItemHeader,
}) => {
  const carouselRef: any = useRef(null);

  useEffect(() => {
    let timeoutId: any = null;

    if (initial !== null) {
      timeoutId = setTimeout(
        () => carouselRef.current.snapToItem(initial, true, true),
        250
      );
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [initial]);

  return (
    <Overlay
      fullScreen
      isVisible={isVisible}
      overlayStyle={styles.overlayContainer}
      onBackdropPress={() => onBackPress(initial)}
    >
      <Carousel
        useScrollView
        data={stories}
        ref={carouselRef}
        itemWidth={width}
        sliderWidth={width}
        initialScrollIndex={initial}
        scrollInterpolator={instaEffect.scrollInterpolator}
        slideInterpolatedStyle={instaEffect.animatedStyles}
        onSnapToItem={(idx) => onMoveToNextStory(idx)}
        renderItem={({ item: story, index: idx }) => (
          <StoryDetailItem
            {...story}
            isCurrentStory={initial === idx}
            onBackPress={() => onBackPress(idx)}
            StoryDetailItemFooter={StoryDetailItemFooter}
            StoryDetailItemHeader={StoryDetailItemHeader}
          />
        )}
      />
    </Overlay>
  );
};

StoryDetail.displayName = 'StoryDetail';
