import React, { useState } from 'react';
import { FlatList, ViewStyle } from 'react-native';

import { StoryPreviewItem } from '../StoryPreviewItem';
import { Story, StoryDetail } from '../StoryDetail';

import { styles } from './styles';

import type {
  StoryDetailFooterProps,
  StoryDetailHeaderProps,
} from '../StoryDetailItem';

export type StoryPreviewProps = {
  /**
   * An array of stories to be rendered
   */
  stories: Story[];
  /**
   * Styles for FlatList mini stories container
   */
  style?: ViewStyle;
  /**
   * Callback fired when drag to next item
   */
  onStoryDetailItemNext?: (story: Story, idx: number) => any;
  /**
   * Callback fired when on back button press
   */
  onStoryDetailBackPress?: (story: Story, idx: number) => any;
  /**
   * Callback fired when performed click on preview
   */
  onStoryPreviewItemPress?: (story: Story, idx: number) => any;
  /**
   * Component for Header in Story Detail Item
   */
  StoryDetailItemHeader?: (
    props?: StoryDetailHeaderProps
  ) => React.ReactElement | null;
  /**
   * Component for Footer in Story Detail Item
   */
  StoryDetailItemFooter?: (
    props?: StoryDetailFooterProps
  ) => React.ReactElement | null;
};

export const StoryPreview: React.FC<StoryPreviewProps> = ({
  style,
  stories,
  StoryDetailItemHeader,
  StoryDetailItemFooter,
  onStoryDetailItemNext,
  onStoryDetailBackPress,
  onStoryPreviewItemPress,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [index, setIndex] = useState<any>(null);

  return (
    <>
      <FlatList
        horizontal
        data={stories}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(story) => `${story.id}`}
        contentContainerStyle={[styles.container, style]}
        renderItem={({ item: story, index: idx }) => (
          <StoryPreviewItem
            {...story}
            onPress={() => {
              setIsVisible(true);
              setIndex(idx);

              if (onStoryPreviewItemPress) {
                onStoryPreviewItemPress(story, idx);
              }
            }}
          />
        )}
      />
      <StoryDetail
        initial={index}
        stories={stories}
        isVisible={isVisible}
        StoryDetailItemHeader={StoryDetailItemHeader}
        StoryDetailItemFooter={StoryDetailItemFooter}
        onMoveToNextStory={(idx) => {
          setIndex(idx);

          if (onStoryDetailItemNext) {
            const story: Story = stories[idx];

            if (story) {
              onStoryDetailItemNext(story, idx);
            }
          }
        }}
        onBackPress={(idx: number) => {
          setIsVisible(false);
          setIndex(null);

          if (onStoryDetailBackPress) {
            const story: Story = stories[idx];

            if (story) {
              onStoryDetailBackPress(story, idx);
            }
          }
        }}
      />
    </>
  );
};

StoryPreview.displayName = 'StoryPreview';
