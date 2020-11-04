# React Native Live Stories [![npm version](https://badge.fury.io/js/%40blackbox-vision%2Freact-native-live-stories.svg)](https://badge.fury.io/js/%40blackbox-vision%2Freact-native-live-stories) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

:rocket: An Instagram Stories like component.

## Table of contents

- [Use Case](#use-case)
- [Compatibility](#compatibility)
- [Installation](#installation)
  - [NPM](#npm)
  - [YARN](#yarn)
  - [Peer dependencies](#peer-dependencies)
  - [Additional Steps](#additional-steps)
- [Example Usage](#example-usage)
- [Component API](#component-api)
- [Browser support](#browser-support)
- [Issues](#issues)
- [Contributing](#contributing)
- [License](#license)

## Use Case

You need a component for rendering Instagram like stories.

## Compatibility

Since this library does internal use of hooks you need `React >= 16.8.0`.

## Installation

You can install this library via NPM or YARN.

### NPM

```bash
npm i @blackbox-vision/react-native-live-stories
```

### YARN

```bash
yarn add @blackbox-vision/react-native-live-stories
```

### Peer dependencies

Our library rely in some packages, you'll need to install all of them if you don't have any:

```bash
npm i react-native-elements react-native-video react-native-snap-carousel react-native-vector-icons react-native-linear-gradient
```

### Additional Steps

In Android we do need a little more configuration. Our library uses `react-native-video` as the library to render the `stories` as videos. `react-native-video` ships with 2 android libraries, by default it exposes `MediaPlayer`, and as opt-in you can leverage `ExoPlayer`.

Our library relies in `ExoPlayer` which performs better that actual `MediaPlayer`, so, in order to use it we do need to configure the following things:

1. Edit `settings.gradle` and add the following lines:

```gradle
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android-exoplayer')
```

2. You need to have a file called `react-native.config.js` at the root of your project with the following config:

```javascript
module.exports = {
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
};
```

With this configuration, now you should be able to use our library in `Android` too.

## Example Usage

After reading and performing the previous steps, you should be able to import the library and use it like in this example:

```javascript
// insta-stories.js

import { Text } from 'react-native';
import React, { useState, useCallback } from 'react';
import { StoryPreview } from '@blackbox-vision/react-native-live-stories';

const stories = [
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
    video: 'https://vjs.zencdn.net/v/oceans.mp4',
  },
  {
    id: 3,
    viewed: false,
    preview:
      'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
    video: 'https://vjs.zencdn.net/v/oceans.mp4',
  },
];

const StoryDetailItemHeader = ({
  story,
  goBack,
  mute,
  muted,
  videoDuration,
  videoProgress,
}) => <Text>I am the Header</Text>;

const StoryDetailItemFooter = ({
  story,
  goBack,
  mute,
  muted,
  videoDuration,
  videoProgress,
}) => <Text>I am the Footer</Text>;

const InstaStories = (props) => {
  const onStoryDetailItemNext = useCallback((story, idx) => {
    console.info('Moving to next story', story, ' at index ', idx);
  }, []);

  const onStoryDetailBackPress = useCallback((story, idx) => {
    console.info('Going back from story', story, ' at index ', idx);
  }, []);

  const onStoryPreviewItemPress = useCallback((story, idx) => {
    console.info('Clicking story preview for story', story, ' at index ', idx);
  }, []);

  const getStoryPreviewItemProps = useCallback((story, idx) => ({
    shouldAnimate: !story.viewed,
  }));

  return (
    <StoryPreview
      stories={stories}
      StoryDetailItemHeader={StoryDetailItemHeader}
      StoryDetailItemFooter={StoryDetailItemFooter}
      onStoryDetailItemNext={onStoryDetailItemNext}
      onStoryDetailBackPress={onStoryDetailBackPress}
      onStoryPreviewItemPress={onStoryPreviewItemPress}
      getStoryPreviewItemProps={getStoryPreviewItemProps}
    />
  );
};
```

## Component API

The `StoryPreview` component has the following props:

| Properties               | Types       | Default Value | Description                                          |
| ------------------------ | ----------- | ------------- | ---------------------------------------------------- |
| style                    | `ViewStyle` | none          | Styles for FlatList mini stories container           |
| stories                  | array       | []            | An array of stories to be rendered                   |
| StoryDetailItemHeader    | component   | none          | Component for Header in Story Detail Item            |
| StoryDetailItemFooter    | component   | none          | Component for Footer in Story Detail Item            |
| onStoryDetailItemNext    | function    | none          | Callback fired when drag to next item                |
| onStoryDetailBackPress   | function    | none          | Callback fired when on back button press             |
| onStoryPreviewItemPress  | function    | none          | Callback fired when performed click on preview       |
| getStoryPreviewItemProps | function    | none          | Callback to get story preview item props dynamically |

## Issues

Please, open an [issue](https://github.com/BlackBoxVision/react-native-live-stories/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/BlackBoxVision/react-native-live-stories/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/react-native-live-stories/blob/master/LICENSE) for more information.
