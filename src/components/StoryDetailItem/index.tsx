import React, { useRef } from 'react';
import type { ImageURISource } from 'react-native';
import Video from 'react-native-video';

import { styles } from './styles';

export type StoryDetailItemProps = {
  next: any;
  id?: string;
  idx: number;
  video?: string;
  viewed?: boolean;
  preview?: string | ImageURISource;
};

export const StoryDetailItem: React.FC<StoryDetailItemProps> = ({
  idx,
  next,
  video,
}) => {
  const videoRef = useRef(null);

  return (
    <Video
      muted={true}
      paused={false}
      ref={videoRef}
      resizeMode="cover"
      source={{ uri: video }}
      style={styles.container}
      onEnd={() => {
        if (typeof next === 'function') {
          next(idx);
        }
      }}
    />
  );
};

StoryDetailItem.displayName = 'StoryDetailItem';
