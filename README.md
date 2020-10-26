# React Native Live Stories [![npm version](https://badge.fury.io/js/%40blackbox-vision%2Freact-native-live-stories.svg)](https://badge.fury.io/js/%40blackbox-vision%2Freact-native-live-stories) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

:rocket: An Instagram Stories like component.

## Table of contents

- [Use Case](#use-case)
- [Compatibility](#compatibility)
- [Installation](#installation)
  - [NPM](#npm)
  - [YARN](#yarn)
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

## Example Usage

After reading and performing the previous steps, you should be able to import the library and use it like in this example:

```javascript
import React, { useState } from 'react';
import { StoryPreview } from '@blackbox-vision/react-native-live-stories';

const InstaStories = (props) => {
  return (
    <StoryPreview
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
          video: 'https://vjs.zencdn.net/v/oceans.mp4',
        },
        {
          id: 3,
          viewed: false,
          preview:
            'https://instagram.faep7-1.fna.fbcdn.net/v/t51.2885-19/s320x320/62500940_1363897577094116_5145198214462308352_n.jpg?_nc_ht=instagram.faep7-1.fna.fbcdn.net&_nc_ohc=BkIQomknhK0AX_1xEiM&oh=2269fb6e76910915456b7bb6ff24a282&oe=5FBFFDA9',
          video: 'https://vjs.zencdn.net/v/oceans.mp4',
        },
      ]}
    />
  );
};
```

## Component API

The `StoryPreview` component has the following props:

| Properties              | Types       | Default Value | Description                                    |
| ----------------------- | ----------- | ------------- | ---------------------------------------------- |
| stories                 | array       | none          | An array of stories to be rendered             |
| style                   | `ViewStyle` | none          | Styles for FlatList mini stories container     |
| onStoryDetailItemNext   | function    | none          | Callback fired when drag to next item          |
| onStoryDetailBackPress  | function    | none          | Callback fired when on back button press       |
| onStoryPreviewItemPress | function    | none          | Callback fired when performed click on preview |
| StoryDetailItemHeader   | component   | none          | Component for Header in Story Detail Item      |
| StoryDetailItemFooter   | component   | none          | Component for Footer in Story Detail Item      |

## Issues

Please, open an [issue](https://github.com/BlackBoxVision/react-native-live-stories/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/BlackBoxVision/react-native-live-stories/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/react-native-live-stories/blob/master/LICENSE) for more information.
