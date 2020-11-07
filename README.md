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
    - [RN Video](#react-native-video)
    - [RN Fast Image](#react-native-fast-image)
- [Example Usage](#example-usage)
- [Component API](#component-api)
- [Customization](#customization)
  - [Header](#header)
  - [Footer](#header)
- [TODOs](#todos)
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

We rely on the following packages:

- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
- [react-native-video](https://github.com/react-native-video/react-native-video)
- [react-native-elements](https://reactnativeelements.com)
- [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)

You can install all of them by running the next command:

```bash
npm i react-native-elements react-native-video react-native-snap-carousel react-native-vector-icons react-native-linear-gradient react-native-fast-image
```

### Additional Steps

#### React Native Video

For `Android` you'll need to perform some additional steps because of `react-native-video`.

`react-native-video` by defaults ships with a component that relies on `Android MediaPlayer`, but this component has many issues related to video reproduction. Also, it ships as opt-in a component based on `ExoPlayer` which is a more performant video player for Android.

In order to use `ExoPlayer` you'll need to perform the following steps:

1. Edit `settings.gradle` and add the next lines:

```gradle
include ':react-native-video'
project(':react-native-video').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-video/android-exoplayer')
```

2. You need to have a file called `react-native.config.js` at the root of your project with the next config:

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

With this configuration, now you should be able to use our library in `Android` too and make video reproduction rely on `ExoPlayer` instead of `MediaPlayer`.

#### React Native Fast Image

If in your android builds you've proguard enabled, you will need to add the following config in `proguard-rules.pro`:

```bash
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}
```

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

## Customization

We provide some sort of customization by passing some components that can override the defaults from the library.

For now, we only give the ability to customize the followings components:

- **Story Header**
- **Story Footer**

### Header

You can pass to the `StoryPreview` the component prop `StoryDetailItemHeader` that will replace the `Header` shipped by default.

**Example Header:**

```javascript
import React from 'react';
import { Text } from 'react-native';

export const StoryHeader = ({
  mute,
  muted,
  story,
  goBack,
  videoDuration,
  videoProgress,
}) => <Text>I am the header</Text>;

StoryHeader.displayName = 'StoryHeader';
```

### Footer

You can pass to the `StoryPreview` the component prop `StoryDetailItemFooter` that will replace the `Footer` shipped by default.

**Example Footer:**

```javascript
import React from 'react';
import { Text } from 'react-native';

export const StoryFooter = ({
  mute,
  muted,
  story,
  goBack,
  videoDuration,
  videoProgress,
}) => <Text>I am the footer</Text>;

StoryFooter.displayName = 'StoryFooter';
```

## TODOs

With this library we're intended to have you covered when trying to implement stories into a React Native app.

As part of our efforts we've a very stable code by now, but we need to improve much things in order to reach a stable release.

Here is a list of things we need to do:

- [ ] Re-define story attributes to support passing more information.
- [ ] Improve grow animation to behave like Insta one.
- [ ] Add support for loading effect in Previews like Insta.
- [ ] Add support for rendering multiple same user stories.
- [ ] Add support for rendering initial preview with a CTA.
- [ ] Improve video pre-loading and reproduction by relying on caché.
- [ ] Ship with a default Header and Footer in the story that looks like Instagram ones

## Issues

Please, open an [issue](https://github.com/BlackBoxVision/react-native-live-stories/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/BlackBoxVision/react-native-live-stories/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/react-native-live-stories/blob/master/LICENSE) for more information.
