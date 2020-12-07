import React, { useState } from 'react';

import type { Story, Coords, StoryPreviewProps } from '../../types';

import { StoryPreviewItem } from '../StoryPreviewItem';

import { useTrackExpandAnimation } from '../../hooks/useTrackExpandAnimation';
import { usePreloadImages } from '../../hooks/usePreloadImages';
import { useTrackRaf } from '../../hooks/useTrackRaf';

export const useStoryPreview = ({
  stories,
  onStoryDetailItemNext,
  onStoryDetailBackPress,
  onStoryPreviewItemPress,
  getStoryPreviewItemProps,
}: StoryPreviewProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animated, setAnimated] = useState<boolean>(false);
  const [index, setIndex] = useState<any>(null);

  const { trackRaf } = useTrackRaf();
  const { expanderRef } = useTrackExpandAnimation(isVisible, () =>
    setAnimated(false)
  );

  usePreloadImages(stories);

  const onPreviewItemPress = (story: Story, coords: Coords) => {
    trackRaf(() => {
      const storyIndex = stories.findIndex((s: Story) => s.id === story.id);

      // setIndex before animated to make carousel have index before animation finish
      setIndex(storyIndex);
      setAnimated(true);

      if (expanderRef.current) {
        expanderRef.current.startExpandAnimation(coords, () => {
          setIsVisible(true);

          if (onStoryPreviewItemPress) {
            onStoryPreviewItemPress(story, storyIndex);
          }
        });
      } else {
        setIsVisible(true);
      }
    });
  };

  const onMoveToNextStory = (idx: number) => {
    trackRaf(() => {
      setIndex(idx);

      if (onStoryDetailItemNext) {
        const story: Story = stories[idx];

        if (story) {
          onStoryDetailItemNext(story, idx);
        }
      }
    });
  };

  const onBackPress = (idx: number) => {
    trackRaf(() => {
      setIsVisible(false);
      setIndex(null);

      if (onStoryDetailBackPress) {
        const story: Story = stories[idx];

        if (story) {
          onStoryDetailBackPress(story, idx);
        }
      }
    });
  };

  // TODO: add size property to make it customizable
  const getItemLayout = (_, idx) => ({
    offset: 70 * idx,
    length: 70,
    index: idx,
  });

  const renderPreviewItem = ({ item: story, index: idx }) => {
    let StoryPreviewItemProps: any = {};

    if (getStoryPreviewItemProps) {
      StoryPreviewItemProps = getStoryPreviewItemProps(story, idx);
    }

    return (
      <StoryPreviewItem
        {...StoryPreviewItemProps}
        onPress={onPreviewItemPress}
        story={story}
      />
    );
  };

  const keyExtractor = (story: Story) => `${story.id}`;

  return {
    index,
    animated,
    isVisible,
    expanderRef,
    onBackPress,
    keyExtractor,
    getItemLayout,
    renderPreviewItem,
    onMoveToNextStory,
  };
};
