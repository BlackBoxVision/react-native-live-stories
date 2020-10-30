import React from 'react';
import { Platform } from 'react-native';
import { Header, Icon } from 'react-native-elements';

import { styles } from './styles';

export type StoryHeaderProps = {
  backgroundColor?: string;
  title?: string;
  onPressBackButton?: any;
  muted?: boolean;
  mute?: any;
};

const arrowBackName = Platform.select({
  ios: 'arrow-back-ios',
  android: 'arrow-back',
});

const StoryHeader: React.FC<StoryHeaderProps> = ({
  backgroundColor,
  onPressBackButton,
  muted,
  mute,
}) => (
  <Header
    backgroundColor={backgroundColor}
    leftComponent={
      ((_props, _context) => (
        <Icon
          color="#FFF"
          name={arrowBackName as string}
          iconStyle={styles.icon}
          onPress={onPressBackButton}
        />
      )) as any
    }
    rightComponent={
      ((_props, _context) => (
        <Icon
          color="#FFF"
          name={muted ? 'volume-mute' : 'volume-up'}
          iconStyle={styles.icon}
          onPress={mute}
        />
      )) as any
    }
  />
);

StoryHeader.defaultProps = {
  backgroundColor: 'transparent',
};

StoryHeader.displayName = 'StoryHeader';

export default StoryHeader;
