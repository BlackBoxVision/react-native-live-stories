import React from 'react';
import Video from 'react-native-video';
import { ActivityIndicator } from 'react-native';

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
      header,
      footer,
      videoRef,
      visible,
      paused,
      muted,
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
          header={header}
          content={
            <>
              {visible && isCurrentStory && (
                <ActivityIndicator
                  animating
                  color="#FFFFFF"
                  style={styles.indicator}
                />
              )}
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
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              />
            </>
          }
          footer={footer}
        />
      </>
    );
  }
);

StoryDetailItem.displayName = 'StoryDetailItem';
