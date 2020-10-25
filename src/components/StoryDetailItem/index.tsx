import Video from 'react-native-video';
import React, { useEffect, useState } from 'react';

import type { ImageURISource } from 'react-native';

import { styles } from './styles';

export type StoryDetailHeaderProps = {
  goBack: () => any;
  mute: () => any;
};

export type StoryDetailFooterProps = {
  videoDuration: number | string | null;
  videoProgress: number | string | null;
};

export type StoryDetailItemProps = {
  next?: any;
  id?: string;
  video?: string;
  viewed?: boolean;
  onVideoEnd?: any;
  isCurrentStory: boolean;
  preview?: string | ImageURISource;
  onBackPress: () => any;
  StoryDetailItemHeader: (
    props?: StoryDetailHeaderProps
  ) => React.ReactElement | null;
  StoryDetailItemFooter: (
    props?: StoryDetailFooterProps
  ) => React.ReactElement | null;
};

export const StoryDetailItem: React.FC<StoryDetailItemProps> = ({
  video,
  onBackPress,
  isCurrentStory,
  StoryDetailItemHeader,
  StoryDetailItemFooter,
}) => {
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);

  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (isCurrentStory) {
      setPaused(false);
    } else {
      setPaused(true);
    }
  }, [isCurrentStory]);

  return (
    <>
      <StoryDetailItemHeader
        goBack={() => onBackPress()}
        mute={() => setMuted(!muted)}
      />
      <Video
        muted={muted}
        paused={paused}
        controls={false}
        resizeMode="cover"
        source={{ uri: video }}
        style={styles.container}
        onLoad={(nativeEvent: any) => {
          setProgress(nativeEvent.currentPosition);
          setDuration(nativeEvent.duration);
        }}
        onProgress={(nativeEvent: any) => setProgress(nativeEvent.currentTime)}
      />
      <StoryDetailItemFooter
        videoProgress={progress}
        videoDuration={duration}
      />
    </>
  );
};

StoryDetailItem.displayName = 'StoryDetailItem';
StoryDetailItem.defaultProps = {
  StoryDetailItemHeader: () => null,
  StoryDetailItemFooter: () => null,
};
