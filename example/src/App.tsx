import React, { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { StoryPreview } from '@blackbox-vision/react-native-live-stories';

import StoryHeader from './components/StoryHeader';
import StoryFooter from './components/StoryFooter';

const { width } = Dimensions.get('screen');

console.disableYellowBox = true;

const StoryDetailItemHeader = ({
  goBack,
  mute,
  muted,
  videoProgress,
  videoDuration,
}: any) => (
  <StoryHeader
    onPressBackButton={goBack}
    mute={mute}
    muted={muted}
    progress={videoProgress && videoDuration && videoProgress / videoDuration}
  />
);

const StoryDetailItemFooter = () => (
  <StoryFooter placeholder="Enviar mensaje" />
);

const stories = [
  {
    id: 1,
    preview: require('./assets/images/1.jpg'),
    video: require('./assets/videos/1.mp4'),
    viewed: false,
  },
  {
    id: 2,
    preview: require('./assets/images/2.jpg'),
    video: require('./assets/videos/2.mp4'),
    viewed: false,
  },
  {
    id: 3,
    preview: require('./assets/images/3.jpg'),
    video: require('./assets/videos/3.mp4'),
    viewed: false,
  },
  {
    id: 4,
    preview: require('./assets/images/4.jpg'),
    video: require('./assets/videos/4.mp4'),
    viewed: false,
  },
  {
    id: 5,
    preview: require('./assets/images/5.jpg'),
    video: require('./assets/videos/1.mp4'),
    viewed: false,
  },
  {
    id: 6,
    preview: require('./assets/images/6.jpg'),
    video: require('./assets/videos/2.mp4'),
    viewed: true,
  },
  {
    id: 7,
    preview: require('./assets/images/7.jpg'),
    video: require('./assets/videos/3.mp4'),
    viewed: true,
  },
];

const App = () => {
  const getStoryPreviewItemProps = useCallback(
    (story) => ({
      shouldAnimate: !story.viewed,
      gradient: story.viewed
        ? {
            colors: ['#D3D3D3', '#D3D3D3'],
          }
        : undefined,
    }),
    []
  );

  return (
    <SafeAreaView>
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => `${item}`}
        ListHeaderComponent={() => (
          <StoryPreview
            stories={stories}
            StoryDetailItemHeader={StoryDetailItemHeader}
            StoryDetailItemFooter={StoryDetailItemFooter}
            getStoryPreviewItemProps={getStoryPreviewItemProps}
          />
        )}
        renderItem={() => (
          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            style={styles.item}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    height: width - 32,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

App.displayName = 'App';

export default App;
