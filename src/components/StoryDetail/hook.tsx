import React, { MutableRefObject, useRef } from 'react';
import type Carousel from 'react-native-snap-carousel';

import { useTrackRaf } from '../../hooks/useTrackRaf';

import type { StoryDetailProps } from '../../types';

import { StoryDetailItem } from '../StoryDetailItem';

export const useStoryDetail = ({
  initial,
  stories,
  onBackPress,
  StoryDetailItemHeader,
  StoryDetailItemFooter,
}: StoryDetailProps) => {
  const carouselRef: MutableRefObject<Carousel<any> | null> = useRef(null);

  const { trackRaf } = useTrackRaf();

  const onBackDropPress = () => onBackPress(initial);

  const onTapLeft = (idx) => {
    trackRaf(() => {
      carouselRef.current?.snapToItem(idx - 1, false, false);
    });
  };

  const onTapRight = (idx) => {
    trackRaf(() => {
      carouselRef.current?.snapToItem(idx + 1, false, false);
    });
  };

  const onVideoEnd = (idx) => {
    if (idx <= stories.length - 2) {
      trackRaf(() => {
        carouselRef.current?.snapToItem(idx + 1, false, false);
      });
    } else {
      onBackPress(idx);
    }
  };

  // TODO: turn into component
  const renderStoryDetailItem = ({ item: story, index: idx }) => (
    <StoryDetailItem
      story={story}
      isCurrentStory={initial === idx}
      StoryDetailItemHeader={StoryDetailItemHeader}
      StoryDetailItemFooter={StoryDetailItemFooter}
      onBackPress={() => onBackPress(idx)}
      onVideoEnd={() => onVideoEnd(idx)}
      onTapRight={() => onTapRight(idx)}
      onTapLeft={() => onTapLeft(idx)}
    />
  );

  return {
    onBackDropPress,
    renderStoryDetailItem,
  };
};
