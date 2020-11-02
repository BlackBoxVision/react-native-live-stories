import React from 'react';
import Video from 'react-native-video';

import type { StoryDetailItemProps } from '../../types';

import { StoryDetailItemLayout } from './Layout';
import { StoryDetailItemLoading } from './Loading';

import { styles } from './styles';
import { useStoryDetailItem } from './hook';

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
  const {
    videoRef,
    visible,
    paused,
    muted,
    duration,
    progress,
    mute,
    goBack,
    onLoadStart,
    onLoad,
    onProgress,
    onEnd,
    onTouchStart,
    onTouchEnd,
  } = useStoryDetailItem({
    story,
    onVideoEnd,
    onBackPress,
    isCurrentStory,
    onVideoTouchEnd,
    onVideoTouchStart,
  });

  const commonProps = {
    mute,
    muted,
    story,
    goBack,
    videoProgress: progress,
    videoDuration: duration,
  };

  const header = isCurrentStory && <StoryDetailItemHeader {...commonProps} />;
  const footer = isCurrentStory && <StoryDetailItemFooter {...commonProps} />;

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
            controls={false}
            resizeMode="cover"
            style={styles.container}
            source={{ uri: story.video }}
            paused={!isCurrentStory && paused}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            onProgress={onProgress}
            onEnd={onEnd}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
        }
        footer={footer}
      />
    </>
  );
};
