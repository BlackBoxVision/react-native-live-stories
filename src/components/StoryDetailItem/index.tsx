import Video from 'react-native-video';
import React, { useEffect, useState, useRef } from 'react';

import type { Story } from '../StoryDetail';

import { StoryDetailItemLayout } from './Layout';
import { StoryDetailItemLoading } from './Loading';

import { styles } from './styles';

export type RenderItemProps = {
  /**
   * The story content
   */
  story: Story;
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
   * The story content
   */
  story: Story;
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
  onBackPress?: () => any;
  /**
   * A callback triggered when video touch starts
   */
  onVideoTouchStart?: () => any;
  /**
   * A callback triggered when video touch ends
   */
  onVideoTouchEnd?: () => any;
  /**
   * A component to render as the Header of the Story Detail Item
   */
  StoryDetailItemHeader?: (
    props?: RenderItemProps
  ) => React.ReactElement | null;
  /**
   * A component to render as the Footer of the Story Detail Item
   */
  StoryDetailItemFooter?: (
    props?: RenderItemProps
  ) => React.ReactElement | null;
};

export const StoryDetailItem: React.FC<StoryDetailItemProps> = ({
  story,
  onVideoEnd,
  onBackPress,
  isCurrentStory,
  onVideoTouchEnd,
  onVideoTouchStart,
  StoryDetailItemHeader = () => null,
  StoryDetailItemFooter = () => null,
}) => {
  const videoRef: any = useRef(null);

  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);

  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(0);

  const goBack = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  useEffect(() => {
    setPaused(isCurrentStory ? false : true);

    if (videoRef.current) {
      videoRef.current.seek(0);
      setProgress(0);
    }
  }, [isCurrentStory]);

  const header = (
    <StoryDetailItemHeader
      story={story}
      goBack={goBack}
      muted={muted}
      mute={() => setMuted(!muted)}
      videoProgress={progress}
      videoDuration={duration}
    />
  );

  const footer = (
    <StoryDetailItemFooter
      story={story}
      goBack={goBack}
      muted={muted}
      mute={() => setMuted(!muted)}
      videoProgress={progress}
      videoDuration={duration}
    />
  );

  return (
    <>
      <StoryDetailItemLoading
        isVisible={visible && isCurrentStory}
        goBack={goBack}
        header={header}
        footer={footer}
      />
      <StoryDetailItemLayout
        header={header}
        content={
          <Video
            ref={videoRef}
            muted={muted}
            paused={paused}
            controls={false}
            resizeMode="cover"
            style={styles.container}
            source={{ uri: story.video }}
            onLoadStart={() => setVisible(true)}
            onLoad={(nativeEvent: any) => {
              setProgress(nativeEvent.currentPosition);
              setDuration(nativeEvent.duration);
              setVisible(false);
            }}
            onProgress={(nativeEvent: any) =>
              setProgress(nativeEvent.currentTime)
            }
            onEnd={() => {
              onVideoEnd();

              if (videoRef.current) {
                videoRef.current.seek(0);
              }
            }}
            onTouchStart={() => {
              setPaused(true);

              if (onVideoTouchStart) {
                onVideoTouchStart();
              }
            }}
            onTouchEnd={() => {
              setPaused(false);

              if (onVideoTouchEnd) {
                onVideoTouchEnd();
              }
            }}
          />
        }
        footer={footer}
      />
    </>
  );
};

StoryDetailItem.displayName = 'StoryDetailItem';
