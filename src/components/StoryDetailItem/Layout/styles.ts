import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  header: {
    top: 0,
    left: 0,
    height: 100,
    width: '100%',
    zIndex: 20,
    elevation: 20,
    position: 'absolute',
  },
  footer: {
    left: 0,
    bottom: 0,
    height: 100,
    width: '100%',
    zIndex: 20,
    elevation: 20,
    position: 'absolute',
  },
  left: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.15,
    height: '100%',
    zIndex: 20,
    elevation: 20,
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.15,
    height: '100%',
    zIndex: 20,
    elevation: 20,
  },
});
