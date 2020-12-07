import React from 'react';
import { FlatList } from 'react-native';

import type { Story, StoryPreviewProps } from '../../types';
import { StoryDetail } from '../StoryDetail';

import { useStoryPreview } from './hook';
import { styles } from './styles';

const noopRenderItem = () => null;

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
  const {
    index,
    animated,
    isVisible,
    expanderRef,
    onBackPress,
    keyExtractor,
    getItemLayout,
    renderPreviewItem,
    onMoveToNextStory,
  } = useStoryPreview({
    stories,
    onStoryDetailItemNext,
    onStoryDetailBackPress,
    onStoryPreviewItemPress,
    getStoryPreviewItemProps,
  });

  const sortedStories = [
    ...stories.filter((story: Story) => story && !story.viewed),
    ...stories.filter((story: Story) => story && story.viewed),
  ];

  return (
    <>
      <FlatList
        horizontal
        data={sortedStories}
        renderItem={noopRenderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        CellRendererComponent={renderPreviewItem}
        contentContainerStyle={[styles.container, style]}
      />
      <StoryDetail
        ref={expanderRef}
        initial={index}
        stories={stories}
        animated={animated}
        isVisible={isVisible}
        onBackPress={onBackPress}
        onMoveToNextStory={onMoveToNextStory}
        StoryDetailItemHeader={StoryDetailItemHeader}
        StoryDetailItemFooter={StoryDetailItemFooter}
      />
    </>
  );
};

StoryPreview.displayName = 'StoryPreview';
