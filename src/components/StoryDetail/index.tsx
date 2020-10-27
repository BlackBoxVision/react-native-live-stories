import { Dimensions, Platform } from 'react-native';
import { Overlay } from 'react-native-elements';
import React, { useEffect, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';

import {
  StoryDetailHeaderItemProps,
  StoryDetailFooterItemProps,
  StoryDetailItem,
} from '../StoryDetailItem';

import * as instaEffect from './animations';

import { styles } from './styles';

export type Story = {
  /**
   * The ID of the story
   */
  id: string | number | any;
  /**
   * The URL to the video
   */
  video: string;
  /**
   * The URL to the avatar image
   */
  preview: string;
  /**
   * A flag to mark the Story as visualized
   */
  viewed: boolean;
};

export type StoreDetailProps = {
  /**
   * The initial index of the Story to present
   */
  initial: number;
  /**
   * An array of stories to render
   */
  stories: Story[];
  /**
   * A prop to mark if we need to show the Story Detail
   */
  isVisible: boolean;
  /**
   * A back button handler callback
   */
  onBackPress: (idx: number) => any;
  /**
   * Callback fired when we move to the next story
   */
  onMoveToNextStory: (idx: number) => any;
  /**
   * A component to render as the Header of the Story Detail Item
   */
  StoryDetailItemHeader?: (
    props?: StoryDetailHeaderItemProps
  ) => React.ReactElement | null;
  /**
   * A component to render as the Footer of the Story Detail Item
   */
  StoryDetailItemFooter?: (
    props?: StoryDetailFooterItemProps
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
        Platform.OS === 'ios' ? 25 : 0
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
  );
};

StoryDetail.displayName = 'StoryDetail';
