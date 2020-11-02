import { useEffect, useState, useRef, useCallback } from 'react';

import type { StoryDetailItemProps } from '../../types';

export const useStoryDetailItem = ({
  onVideoEnd,
  onBackPress,
  isCurrentStory,
  onVideoTouchEnd,
  onVideoTouchStart,
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

  return {
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
  };
};
