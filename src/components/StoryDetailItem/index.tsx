import React from 'react';
import Video from 'react-native-video';
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

import type { StoryDetailItemProps } from '../../types';

import { StoryDetailItemLayout } from './Layout';

import { styles } from './styles';
import { useStoryDetailItem } from './hook';

export const StoryDetailItem = React.forwardRef<any, StoryDetailItemProps>(
  (
    {
      story,
      onVideoEnd,
      onBackPress,
      isCurrentStory,
      onVideoTouchEnd,
      onVideoTouchStart,
      onTapLeft = () => {},
      onTapRight = () => {},
      StoryDetailItemHeader = () => null,
      StoryDetailItemFooter = () => null,
    },
    ref: any
  ) => {
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
      ref,
      story,
      onVideoEnd,
      onBackPress,
      isCurrentStory,
      onVideoTouchEnd,
      onVideoTouchStart,
      StoryDetailItemHeader,
      StoryDetailItemFooter,
    } as any);

    return (
      <StoryDetailItemLayout
        onTapLeft={onTapLeft}
        onTapRight={onTapRight}
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
    );
  }
);
