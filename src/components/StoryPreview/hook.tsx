import React, { useState, useRef, useEffect, useCallback } from 'react';

import type {
  Story,
  Coords,
  StoryPreviewProps,
  StoryDetailExpanderRef,
} from '../../types';

import { StoryPreviewItem } from '../StoryPreviewItem';

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

  const expanderRef: StoryDetailExpanderRef = useRef(null);

  useEffect(() => {
    const rafId: number = requestAnimationFrame(() => {
      if (!isVisible) {
        if (expanderRef.current) {
          expanderRef.current.resetExpandAnimation(() => setAnimated(false));
        }
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  const onPreviewItemPress = useCallback(
    (story: Story, coords: Coords) => {
      requestAnimationFrame(() => {
        setAnimated(true);

        const storyIndex = stories.findIndex((s: Story) => s.id === story.id);

        if (expanderRef.current) {
          expanderRef.current.startExpandAnimation(coords, () => {
            setIsVisible(true);
            setIndex(storyIndex);

            if (onStoryPreviewItemPress) {
              onStoryPreviewItemPress(story, storyIndex);
            }
          });
        } else {
          setIsVisible(true);
          setIndex(storyIndex);
        }
      });
    },
    [stories, expanderRef, onStoryPreviewItemPress]
  );

  const onMoveToNextStory = useCallback(
    (idx: number) => {
      requestAnimationFrame(() => {
        setIndex(idx);

        if (onStoryDetailItemNext) {
          const story: Story = stories[idx];

          if (story) {
            onStoryDetailItemNext(story, idx);
          }
        }
      });
    },
    [stories, onStoryDetailItemNext]
  );

  const onBackPress = useCallback(
    (idx: number) => {
      requestAnimationFrame(() => {
        setIsVisible(false);
        setIndex(null);

        if (onStoryDetailBackPress) {
          const story: Story = stories[idx];

          if (story) {
            onStoryDetailBackPress(story, idx);
          }
        }
      });
    },
    [stories, onStoryDetailBackPress]
  );

  // TODO: add size property to make it customizable
  const getItemLayout = useCallback(
    (_, index) => ({
      offset: 90 * index,
      length: 90,
      index,
    }),
    []
  );

  const renderPreviewItem = useCallback(
    ({ item, index }) => {
      let StoryPreviewItemProps: any = {};

      if (getStoryPreviewItemProps) {
        StoryPreviewItemProps = getStoryPreviewItemProps(item, index);
      }

      return (
        <StoryPreviewItem
          {...StoryPreviewItemProps}
          onPress={onPreviewItemPress}
          ref={expanderRef}
          story={item}
        />
      );
    },
    [getStoryPreviewItemProps, expanderRef, onPreviewItemPress]
  );

  const keyExtractor = useCallback((story: Story) => `${story.id}`, []);

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
