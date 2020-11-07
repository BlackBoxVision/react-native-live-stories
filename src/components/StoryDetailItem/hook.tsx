import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import type { Story, StoryDetailItemProps } from '../../types';

export const useStoryDetailItem = ({
  story,
  onVideoEnd,
  onBackPress,
  isCurrentStory,
  onVideoTouchEnd,
  onVideoTouchStart,
  StoryDetailItemHeader,
  StoryDetailItemFooter,
}: StoryDetailItemProps) => {
  const videoRef: any = useRef(null);

  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);

  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isCurrentStory) {
      setPaused(false);
    }

    if (videoRef.current) {
      videoRef.current.seek(0);
      setProgress(0);
    }
  }, [isCurrentStory]);

  const mute = useCallback(() => setMuted((m) => !m), []);

  const goBack = useCallback(() => {
    if (onBackPress) {
      onBackPress();
    }
  }, [onBackPress]);

  const onLoadStart = useCallback(() => {
    setVisible(true);
  }, []);

  const onLoad = useCallback((nativeEvent: any) => {
    setProgress(nativeEvent.currentPosition);
    setDuration(nativeEvent.duration);
    setVisible(false);
  }, []);

  const onProgress = useCallback(
    (nativeEvent: any) => setProgress(nativeEvent.currentTime),
    []
  );

  const onEnd = useCallback(() => {
    onVideoEnd();

    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [onVideoEnd, videoRef]);

  const onTouchStart = useCallback(() => {
    setPaused(true);

    if (onVideoTouchStart) {
      onVideoTouchStart();
    }
  }, [onVideoTouchStart]);

  const onTouchEnd = useCallback(() => {
    setPaused(false);

    if (onVideoTouchEnd) {
      onVideoTouchEnd();
    }
  }, [onVideoTouchEnd]);

  const getVideoSource = useCallback((story?: Story): any => {
    if (typeof story?.video === 'string') {
      return {
        uri: story?.video,
      };
    }

    return story?.video;
  }, []);

  const header = useMemo(
    () => (
      <StoryDetailItemHeader
        mute={mute}
        muted={muted}
        story={story}
        goBack={goBack}
        progress={progress}
        duration={duration}
      />
    ),
    [mute, muted, story, goBack, progress, duration]
  );

  const footer = useMemo(
    () => (
      <StoryDetailItemFooter
        mute={mute}
        muted={muted}
        story={story}
        goBack={goBack}
        progress={progress}
        duration={duration}
      />
    ),
    [mute, muted, story, goBack, progress, duration]
  );

  return {
    header,
    footer,
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
    getVideoSource,
  };
};
