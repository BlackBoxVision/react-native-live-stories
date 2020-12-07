import convertToProxyURL from 'react-native-video-cache';
import { useEffect, useState, useRef } from 'react';

import type { Story } from '../../types';

export const useStoryDetailItem = ({
  ref,
  onVideoEnd,
  onBackPress,
  isCurrentStory,
  onVideoTouchEnd,
  onVideoTouchStart,
}: any) => {
  const videoRef: any = useRef(ref);

  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);

  const [duration, setDuration] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isCurrentStory) {
      setPaused(false);
      setProgress(0);
    }
  }, [isCurrentStory]);

  const mute = () => setMuted((m) => !m);

  const goBack = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  const onLoadStart = () => {
    setVisible(true);
  };

  const onLoad = (nativeEvent: any) => {
    setProgress(nativeEvent.currentPosition);
    setDuration(nativeEvent.duration);
    setVisible(false);
  };

  const onProgress = (nativeEvent: any) => setProgress(nativeEvent.currentTime);

  const onEnd = () => {
    if (onVideoEnd) {
      onVideoEnd();
    }

    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  };

  const onTouchStart = () => {
    setPaused(true);

    if (onVideoTouchStart) {
      onVideoTouchStart();
    }
  };

  const onTouchEnd = () => {
    setPaused(false);

    if (onVideoTouchEnd) {
      onVideoTouchEnd();
    }
  };

  const getVideoSource = (story?: Story): any => {
    if (typeof story?.video === 'string') {
      return {
        uri: convertToProxyURL(story?.video),
      };
    }

    return story?.video;
  };

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
    getVideoSource,
  };
};
