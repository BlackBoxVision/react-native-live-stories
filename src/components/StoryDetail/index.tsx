import React, { useEffect, useRef } from 'react';
import { Overlay } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import { StoryDetailItem } from '../StoryDetailItem';

import { useStoryDetail } from './hook';
import { styles } from './styles';

export type Story = {
  id?: string;
  video?: string;
  viewed?: boolean;
  preview: string;
};

export type StoreDetailProps = {
  initial: number;
  stories: Story[];
  onBackPress: any;
  isVisible: boolean;
  onMoveToNextStory: any;
};

export const StoryDetail: React.FC<StoreDetailProps> = ({
  initial,
  stories,
  isVisible,
  onBackPress,
  onMoveToNextStory,
}) => {
  const carouselRef: any = useRef(null);

  const { width } = useStoryDetail(carouselRef);

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
      onBackdropPress={onBackPress}
      overlayStyle={styles.overlayContainer}
    >
      <Carousel
        data={stories}
        ref={carouselRef}
        itemWidth={width}
        sliderWidth={width}
        initialScrollIndex={initial}
        onSnapToItem={(idx) => onMoveToNextStory(idx)}
        renderItem={({ item: story, index: idx }) => (
          <StoryDetailItem {...story} isCurrentStory={initial === idx} />
        )}
      />
    </Overlay>
  );
};

StoryDetail.displayName = 'StoryDetail';
