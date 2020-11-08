import React, { useCallback } from 'react';
import { Divider } from 'react-native-paper';
import { Instagram } from 'react-content-loader/native';
import { FlatList, StyleSheet, SafeAreaView, View } from 'react-native';
import { StoryPreview } from '@blackbox-vision/react-native-live-stories';

import StoryHeader from './components/StoryHeader';
import StoryFooter from './components/StoryFooter';

console.disableYellowBox = true;

const StoryDetailItemHeader = ({
  goBack,
  mute,
  muted,
  progress,
  duration,
}: any) => (
  <StoryHeader
    mute={mute}
    muted={muted}
    onPressBackButton={goBack}
    progress={progress && duration && progress / duration}
  />
);

const StoryDetailItemFooter = () => (
  <StoryFooter placeholder="Enviar mensaje" />
);

const stories = [
  {
    id: 1,
    preview:
      'https://res.cloudinary.com/blackboxvision/image/upload/f_auto/w_200/q_auto:best/v1604770257/OpenSource/react-native-live-stories/images/1_lqcrf6.jpg',
    video:
      'https://res.cloudinary.com/blackboxvision/video/upload/v1604771037/OpenSource/react-native-live-stories/videos/1_qda00p.mp4',
    viewed: false,
  },
  {
    id: 2,
    preview:
      'https://res.cloudinary.com/blackboxvision/image/upload/f_auto/w_200/q_auto:best/v1604770281/OpenSource/react-native-live-stories/images/2_te4bdg.jpg',
    video:
      'https://res.cloudinary.com/blackboxvision/video/upload/f_auto,q_60:qmax_20/v1604770935/OpenSource/react-native-live-stories/videos/2_ib2rvi.mp4',
    viewed: false,
  },
  {
    id: 3,
    preview:
      'https://res.cloudinary.com/blackboxvision/image/upload/f_auto/w_200/q_auto:best/v1604770821/OpenSource/react-native-live-stories/images/3_ejuc9o.jpg',
    video:
      'https://res.cloudinary.com/blackboxvision/video/upload/f_auto,q_60:qmax_20/v1604771045/OpenSource/react-native-live-stories/videos/3_ndavcm.mp4',
    viewed: false,
  },
  {
    id: 4,
    preview:
      'https://res.cloudinary.com/blackboxvision/image/upload/f_auto/w_200/q_auto:best/v1604770273/OpenSource/react-native-live-stories/images/4_rd7ugn.jpg',
    video:
      'https://res.cloudinary.com/blackboxvision/video/upload/f_auto,q_60:qmax_20/v1604770928/OpenSource/react-native-live-stories/videos/4_gtjhhy.mp4',
    viewed: false,
  },
  {
    id: 5,
    preview:
      'https://res.cloudinary.com/blackboxvision/image/upload/f_auto/w_200/q_auto:best/v1604770271/OpenSource/react-native-live-stories/images/5_wpx1ag.jpg',
    video:
      'https://res.cloudinary.com/blackboxvision/video/upload/f_auto,q_60:qmax_20/v1604771037/OpenSource/react-native-live-stories/videos/1_qda00p.mp4',
    viewed: false,
  },
  {
    id: 6,
    preview:
      'https://res.cloudinary.com/blackboxvision/image/upload/f_auto/w_200/q_auto:best/v1604770268/OpenSource/react-native-live-stories/images/6_zmyutn.jpg',
    video:
      'https://res.cloudinary.com/blackboxvision/video/upload/f_auto,q_60:qmax_20/v1604770935/OpenSource/react-native-live-stories/videos/2_ib2rvi.mp4',
    viewed: true,
  },
  {
    id: 7,
    preview:
      'https://res.cloudinary.com/blackboxvision/image/upload/f_auto/w_200/q_auto:best/v1604770267/OpenSource/react-native-live-stories/images/7_v363yf.jpg',
    video:
      'https://res.cloudinary.com/blackboxvision/video/upload/f_auto,q_60:qmax_20/v1604771045/OpenSource/react-native-live-stories/videos/3_ndavcm.mp4',
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
          <>
            <StoryPreview
              stories={stories}
              StoryDetailItemHeader={StoryDetailItemHeader}
              StoryDetailItemFooter={StoryDetailItemFooter}
              getStoryPreviewItemProps={getStoryPreviewItemProps}
            />
            <Divider style={styles.divider} />
          </>
        )}
        renderItem={({ index }) => (
          <View
            style={[
              styles.insta,
              index === stories.length - 1 && styles.lastItem,
            ]}
          >
            <Instagram backgroundColor="#CA1D7E" foregroundColor="#E35157" />
          </View>
        )}
      />
      <View style={styles.footer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lastItem: {
    marginBottom: 225,
  },
  insta: {
    marginBottom: 150,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 75,
    backgroundColor: '#FFFFFF',
  },
});

App.displayName = 'App';

export default App;
