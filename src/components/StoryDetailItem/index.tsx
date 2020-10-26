import Video from 'react-native-video';
import React, { useEffect, useState } from 'react';

import { styles } from './styles';

export type StoryDetailHeaderProps = {
  /**
   * A function to exit from the StoryDetail
   */
  goBack: () => any;
  /**
   * A callback to mute audio from video
   */
  mute: () => any;
  /**
   * It indicates if the video is muted or not
   */
  muted: boolean;
};

export type StoryDetailFooterProps = {
  /**
   * The duration of the video been rendered
   */
  videoDuration: number | string | null;
  /**
   * The progress of the video been rendered
   */
  videoProgress: number | string | null;
};

export type StoryDetailItemProps = {
  /**
   * The URL to the video
   */
  video?: string;
  /**
   * A boolean prop to enable play
   */
  isCurrentStory: boolean;
  /**
   * Callback fired when video ends
   */
  onVideoEnd: () => any;
  /**
   * A back button handler
   */
  onBackPress: () => any;
  /**
   * A component to render as the Header of the Story Detail Item
   */
  StoryDetailItemHeader: (
    props?: StoryDetailHeaderProps
  ) => React.ReactElement | null;
  /**
   * A component to render as the Footer of the Story Detail Item
   */
  StoryDetailItemFooter: (
    props?: StoryDetailFooterProps
  ) => React.ReactElement | null;
};

export const StoryDetailItem: React.FC<StoryDetailItemProps> = ({
  video,
  onVideoEnd,
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
        muted={muted}
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
        onEnd={() => onVideoEnd()}
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
