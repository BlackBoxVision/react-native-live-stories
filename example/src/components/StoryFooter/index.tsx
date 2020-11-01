import React from 'react';
import { SafeAreaView } from 'react-native';
import { Input, Icon } from 'react-native-elements';

import { styles } from './styles';

export type StoryFooterProps = {
  placeholder: string;
};

const StoryFooter: React.FC<StoryFooterProps> = ({ placeholder }) => (
  <SafeAreaView>
    <Input
      inputContainerStyle={styles.inputContainer}
      placeholder={placeholder}
      placeholderTextColor="#FFF"
      style={styles.input}
      rightIcon={
        (() => (
          <Icon
            color="#FFF"
            name="send"
            type="feather"
            style={styles.sendIcon}
            onPress={() => console.info('Send message!')}
          />
        )) as any
      }
    />
  </SafeAreaView>
);

StoryFooter.displayName = 'StoryFooter';

export default StoryFooter;
