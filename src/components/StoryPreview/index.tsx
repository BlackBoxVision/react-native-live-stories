import { FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

import type {
  Story,
  Coords,
  StoryPreviewProps,
  StoryDetailExpanderRef,
} from '../../types';

import { StoryDetail } from '../StoryDetail';
import { StoryPreviewItem } from '../StoryPreviewItem';

import { styles } from './styles';

// TODO: enable animations based on a property, by default animations will be run
export const StoryPreview: React.FC<StoryPreviewProps> = ({
  style,
  stories = [],
  StoryDetailItemHeader,
  StoryDetailItemFooter,
  onStoryDetailItemNext,
  onStoryDetailBackPress,
  onStoryPreviewItemPress,
  getStoryPreviewItemProps = () => {},
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animated, setAnimated] = useState<boolean>(false);
  const [index, setIndex] = useState<any>(null);

  const expanderRef: StoryDetailExpanderRef = useRef(null);

  const sortedStories = [
    ...stories.filter((story: Story) => story && !story.viewed),
    ...stories.filter((story: Story) => story && story.viewed),
  ];

  useEffect(() => {
    let timeoutId: any = null;

    if (!isVisible) {
      timeoutId = setTimeout(() => {
        if (expanderRef.current) {
          expanderRef.current.resetExpandAnimation(() => setAnimated(false));
        }
      }, 50);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible]);

  return (
    <>
      <FlatList
        horizontal
        data={sortedStories}
        renderItem={() => null}
        getItemLayout={(_, index) => ({
          offset: 90 * index,
          length: 90,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(story) => `${story.id}`}
        contentContainerStyle={[styles.container, style]}
        CellRendererComponent={({ item: story, index: idx }) => {
          const StoryPreviewItemProps =
            getStoryPreviewItemProps && getStoryPreviewItemProps(story, idx);

          return (
            <StoryPreviewItem
              {...StoryPreviewItemProps}
              story={story}
              ref={expanderRef}
              onPress={(story: Story, coords: Coords) => {
                requestAnimationFrame(() => {
                  setAnimated(true);

                  const storyIndex = stories.findIndex(
                    (s: Story) => s.id === story.id
                  );

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
              }}
            />
          );
        }}
      />
      <StoryDetail
        ref={expanderRef}
        initial={index}
        stories={stories}
        animated={animated}
        isVisible={isVisible}
        StoryDetailItemHeader={StoryDetailItemHeader}
        StoryDetailItemFooter={StoryDetailItemFooter}
        onMoveToNextStory={(idx: number) => {
          setIndex(idx);

          if (onStoryDetailItemNext) {
            const story: Story = stories[idx];

            if (story) {
              onStoryDetailItemNext(story, idx);
            }
          }
        }}
        onBackPress={(idx: number) => {
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
        }}
      />
    </>
  );
};

StoryPreview.displayName = 'StoryPreview';
