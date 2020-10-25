import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Story, StoryDetail } from '../StoryDetail';
import { StoryPreviewItem } from '../StoryPreviewItem';

import { styles } from './styles';

export type StoryPreviewProps = {
  stories: Story[];
};

export const StoryPreview = ({ stories }) => {
  const [showDetail, setShowDetail] = useState(false);

  const onPress = async () => {
    // TODO: define additional logic to set idx to show in stories
    // TODO: define logic to mark as viewed
    // TODO: pass an additional onPress for user
    setShowDetail(true);
  };

  return (
    <>
      {!showDetail && (
        <FlatList
          horizontal
          data={stories}
          keyExtractor={({ id }) => `${id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
          renderItem={({ item: story }) => (
            <StoryPreviewItem {...story} onPress={onPress} />
          )}
        />
      )}
      <StoryDetail stories={stories} visible={showDetail} />
    </>
  );
};

StoryPreview.displayName = 'StoryPreview';
