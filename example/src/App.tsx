import * as React from 'react';
import { Header } from 'react-native-elements';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { StoryPreview } from '@blackbox-vision/react-native-live-stories';

// TODO: improve example!!
export default function App() {
  return (
    <SafeAreaView>
      <StoryPreview
        StoryDetailItemHeader={({ goBack }: any) => (
          <SafeAreaView>
            <Header
              centerComponent={
                <TouchableOpacity onPress={goBack}>
                  <Text>Ir para atrás</Text>
                </TouchableOpacity>
              }
            />
          </SafeAreaView>
        )}
        StoryDetailItemFooter={({ goBack }: any) => (
          <SafeAreaView>
            <Header
              centerComponent={
                <TouchableOpacity onPress={goBack}>
                  <Text>Ir para atrás</Text>
                </TouchableOpacity>
              }
            />
          </SafeAreaView>
        )}
        stories={[
          {
            id: 1,
            viewed: false,
            preview:
              'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
            video: 'https://www.w3schools.com/html/mov_bbb.mp4',
          },
          {
            id: 2,
            viewed: false,
            preview:
              'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
            video:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
          {
            id: 3,
            viewed: false,
            preview:
              'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
            video: 'https://vjs.zencdn.net/v/oceans.mp4',
          },
          {
            id: 4,
            viewed: false,
            preview:
              'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
            video: 'https://vjs.zencdn.net/v/oceans.mp4',
          },
          {
            id: 5,
            viewed: false,
            preview:
              'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
            video: 'https://vjs.zencdn.net/v/oceans.mp4',
          },
          {
            id: 6,
            viewed: false,
            preview:
              'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
            video: 'https://vjs.zencdn.net/v/oceans.mp4',
          },
        ]}
      />
    </SafeAreaView>
  );
}
