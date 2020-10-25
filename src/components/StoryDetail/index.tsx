import React, { useRef } from 'react';
import Animated from 'react-native-reanimated';
import { ImageURISource, StyleSheet, View } from 'react-native';

import { StoryDetailItem } from '../StoryDetailItem';
import { useStoryDetail } from './hook';
import { styles } from './styles';

export type Story = {
  id?: string;
  video?: string;
  viewed?: boolean;
  preview?: string | ImageURISource;
};

export type StoreDetailProps = {
  stories: Story[];
  visible: boolean;
};

export const StoryDetail: React.FC<StoreDetailProps> = ({
  stories,
  visible,
}) => {
  const scrollRef = useRef(null);

  const { x, prev, next, width, getStyle, getMaskStyle } = useStoryDetail(
    scrollRef
  );

  if (!stories) {
    if (__DEV__) {
      console.warn(`[StoryDetailContainer]: stories is a required property`);
    }

    return null;
  }

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      {stories &&
        Array.isArray(stories) &&
        stories.map((story, idx) => (
          <Animated.View style={getStyle(idx)} key={idx}>
            <StoryDetailItem {...story} idx={idx} next={next} />
            <Animated.View style={getMaskStyle(idx)} />
          </Animated.View>
        ))}
      <Animated.ScrollView
        ref={scrollRef}
        style={StyleSheet.absoluteFillObject}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        contentContainerStyle={{
          width: width * stories.length,
        }}
        onTouchEnd={(e) => {
          const hasPrev = e.nativeEvent.pageX < width / 2;

          // TODO: remove hardcoded values
          // TODO: add logic to identify current index
          if (hasPrev) {
            prev(2);
          } else {
            next(2);
          }
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { x },
            },
          },
        ])}
        decelerationRate={0.99}
        horizontal
      />
    </View>
  );
};

StoryDetail.displayName = 'StoryDetail';
