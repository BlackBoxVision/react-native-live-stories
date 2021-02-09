import React from 'react';

import { useTrackRaf } from '../../hooks/useTrackRaf';

// Commented until type error is fixed
import type { StoryDetailProps, CarouselRef } from '../../types';

import { StoryDetailItem } from '../StoryDetailItem';

export const useStoryDetail = ({
  initial,
  stories,
  carouselRef,
  onBackPress,
  StoryDetailItemHeader,
  StoryDetailItemFooter,
}: StoryDetailProps & { carouselRef: CarouselRef }) => {
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
        carouselRef.current?.snapToItem(idx + 1, false, true);
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
