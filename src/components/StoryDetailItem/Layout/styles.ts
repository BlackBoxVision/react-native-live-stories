import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  footer: {
    flex: 2,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
});
