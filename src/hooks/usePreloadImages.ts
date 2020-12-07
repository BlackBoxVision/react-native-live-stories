import { useEffect } from 'react';
import FastImage from 'react-native-fast-image';

import type { Story } from '../types';

const isValid = (arr) => Array.isArray(arr) && arr.length > 0;

export const usePreloadImages = (stories: Story[]) => {
  useEffect(() => {
    const images = stories
      .filter((story: Story) => typeof story.preview === 'string')
      .map((story: Story) => ({
        priority: story.viewed
          ? FastImage.priority.low
          : FastImage.priority.high,
        uri: story.preview,
      }));

    if (isValid(images)) {
      FastImage.preload(images);
    }
  }, [stories]);
};
