import { MutableRefObject, useEffect, useRef } from 'react';

export const useTrackRaf = () => {
  const rafIdsRef: MutableRefObject<number[]> = useRef([]);

  useEffect(() => {
    const rafIds = rafIdsRef.current;

    return () => {
      rafIds.forEach((intervalId: number) => {
        cancelAnimationFrame(intervalId);
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackRaf = (callback: (time: number) => void) => {
    rafIdsRef.current.push(requestAnimationFrame(callback));
  };

  return {
    trackRaf,
  };
};
