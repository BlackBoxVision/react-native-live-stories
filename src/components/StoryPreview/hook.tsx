import FastImage from 'react-native-fast-image';
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
    const imagesToPreload = stories
      .filter((story: Story) => typeof story?.preview === 'string')
      .map((story: Story) => ({
        priority: FastImage.priority.high,
        uri: story?.preview,
      }));

    if (Array.isArray(imagesToPreload) && imagesToPreload.length > 0) {
      FastImage.preload(imagesToPreload);
    }
  }, [stories]);

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
    (story: Story, storyIndex: number, coords: Coords) => {
      requestAnimationFrame(() => {
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
    },
    [expanderRef, onStoryPreviewItemPress]
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
    (_, idx) => ({
      offset: 90 * idx,
      length: 90,
      index: idx,
    }),
    []
  );

  const renderPreviewItem = useCallback(
    ({ item, index: idx }) => {
      let StoryPreviewItemProps: any = {};

      if (getStoryPreviewItemProps) {
        StoryPreviewItemProps = getStoryPreviewItemProps(item, idx);
      }

      return (
        <StoryPreviewItem
          {...StoryPreviewItemProps}
          onPress={onPreviewItemPress}
          storyIndex={idx}
          story={item}
        />
      );
    },
    [getStoryPreviewItemProps, onPreviewItemPress]
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
