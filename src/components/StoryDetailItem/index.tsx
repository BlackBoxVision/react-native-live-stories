import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';
import type { ImageURISource } from 'react-native';

import { styles } from './styles';

export type StoryDetailItemProps = {
  next?: any;
  id?: string;
  video?: string;
  viewed?: boolean;
  onVideoEnd?: any;
  isCurrentStory: boolean;
  preview?: string | ImageURISource;
};

export const StoryDetailItem: React.FC<StoryDetailItemProps> = ({
  video,
  isCurrentStory,
}) => {
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (isCurrentStory) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [isCurrentStory]);

  return (
    <Video
      controls
      muted={false}
      paused={paused}
      resizeMode="cover"
      source={{ uri: video }}
      style={styles.container}
    />
  );
};

StoryDetailItem.displayName = 'StoryDetailItem';
