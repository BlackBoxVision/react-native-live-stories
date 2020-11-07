import React from 'react';
import Video from 'react-native-video';
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

import type { StoryDetailItemProps } from '../../types';

import { StoryDetailItemLayout } from './Layout';

import { styles } from './styles';
import { useStoryDetailItem } from './hook';

export const StoryDetailItem: React.FC<StoryDetailItemProps> = React.memo(
  ({
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
      mute,
      muted,
      progress,
      duration,
      goBack,
      videoRef,
      visible,
      paused,
      onLoadStart,
      onLoad,
      onProgress,
      onEnd,
      onTouchStart,
      onTouchEnd,
      getVideoSource,
    } = useStoryDetailItem({
      story,
      onVideoEnd,
      onBackPress,
      isCurrentStory,
      onVideoTouchEnd,
      onVideoTouchStart,
      StoryDetailItemHeader,
      StoryDetailItemFooter,
    });

    return (
      <>
        <StoryDetailItemLayout
          header={
            <StoryDetailItemHeader
              mute={mute}
              muted={muted}
              story={story}
              goBack={goBack}
              progress={progress}
              duration={duration}
            />
          }
          content={
            <>
              {visible && isCurrentStory && (
                <ActivityIndicator
                  animating
                  color="#FFFFFF"
                  style={styles.indicator}
                />
              )}
              <TouchableWithoutFeedback
                onPressIn={onTouchStart}
                onPressOut={onTouchEnd}
              >
                <Video
                  ref={videoRef}
                  muted={muted}
                  controls={false}
                  resizeMode="cover"
                  style={styles.container}
                  source={getVideoSource(story)}
                  paused={paused}
                  onLoadStart={onLoadStart}
                  onLoad={onLoad}
                  onProgress={onProgress}
                  onEnd={onEnd}
                />
              </TouchableWithoutFeedback>
            </>
          }
          footer={
            <StoryDetailItemFooter
              mute={mute}
              muted={muted}
              story={story}
              goBack={goBack}
              progress={progress}
              duration={duration}
            />
          }
        />
      </>
    );
  }
);

StoryDetailItem.displayName = 'StoryDetailItem';
