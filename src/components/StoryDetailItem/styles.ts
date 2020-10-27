import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  overlayContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: '#000000',
  },
  overlayIndicator: {
    ...StyleSheet.absoluteFillObject,
  },
});
