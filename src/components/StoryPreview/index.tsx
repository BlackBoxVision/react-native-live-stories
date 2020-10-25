import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { StoryPreviewItem } from '../StoryPreviewItem';
import { Story, StoryDetail } from '../StoryDetail';

import { styles } from './styles';

export type StoryPreviewProps = {
  stories: Story[];
};

export const StoryPreview = ({ stories }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState<any>(null);

  return (
    <>
      <FlatList
        horizontal
        data={stories}
        keyExtractor={(story) => `${story.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item: story, index: idx }) => (
          <StoryPreviewItem
            {...story}
            onPress={() => {
              // TODO: define additional logic to set idx to show in stories
              // TODO: define logic to mark as viewed
              // TODO: pass an additional onPress for user

              setIsVisible(true);
              setIndex(idx);
            }}
          />
        )}
      />
      <StoryDetail
        initial={index}
        stories={stories}
        isVisible={isVisible}
        onMoveToNextStory={(idx) => setIndex(idx)}
        onBackPress={() => {
          setIsVisible(false);
          setIndex(null);
        }}
      />
    </>
  );
};
