import * as React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StoryPreview } from '@blackbox-vision/react-native-live-stories';

import StoryHeader from './components/StoryHeader';
import StoryFooter from './components/StoryFooter';

const { width } = Dimensions.get('screen');

console.disableYellowBox = true;

const App = () => (
  <SafeAreaView>
    <FlatList
      data={[1, 2, 3, 4]}
      ListHeaderComponent={() => (
        <StoryPreview
          StoryDetailItemFooter={() => (
            <StoryFooter placeholder="Enviar mensaje" />
          )}
          StoryDetailItemHeader={({
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
              progress={
                videoProgress && videoDuration && videoProgress / videoDuration
              }
            />
          )}
          stories={[
            {
              id: 1,
              preview:
                'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
              video: 'https://www.w3schools.com/html/mov_bbb.mp4',
              viewed: false,
            },
            {
              id: 2,
              preview:
                'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
              video:
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              viewed: false,
            },
            {
              id: 3,
              preview:
                'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
              video: 'https://vjs.zencdn.net/v/oceans.mp4',
              viewed: false,
            },
            {
              id: 4,
              preview:
                'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
              video: 'https://vjs.zencdn.net/v/oceans.mp4',
              viewed: false,
            },
            {
              id: 5,
              preview:
                'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
              video: 'https://vjs.zencdn.net/v/oceans.mp4',
              viewed: false,
            },
            {
              id: 6,
              preview:
                'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
              video: 'https://vjs.zencdn.net/v/oceans.mp4',
              viewed: true,
            },
          ]}
          getStoryPreviewItemProps={(story) => ({
            shouldAnimate: !story.viewed,
            gradient: story.viewed
              ? {
                  colors: ['#D3D3D3', '#D3D3D3'],
                }
              : undefined,
          })}
        />
      )}
      renderItem={() => <View style={styles.item} />}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E35157',
    borderRadius: 15,
    height: width - 32,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

App.displayName = 'App';

export default App;
