import { useEffect, useRef } from 'react';
import type { StoryDetailExpanderRef } from '../types';
import { useTrackRaf } from './useTrackRaf';

export const useTrackExpandAnimation = (
  isVisible: boolean,
  callback: () => void
) => {
  const expanderRef: StoryDetailExpanderRef = useRef(null);

  const { trackRaf } = useTrackRaf();

  useEffect(() => {
    trackRaf(() => {
      if (!isVisible) {
        if (expanderRef.current) {
          expanderRef.current.resetExpandAnimation(callback);
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return {
    expanderRef,
  };
};
