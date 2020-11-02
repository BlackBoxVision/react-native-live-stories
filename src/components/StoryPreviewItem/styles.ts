import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    position: 'relative',
    zIndex: 0,
  },
  gradientContainer: {
    alignItems: 'center',
    borderRadius: 85 / 2,
    height: 85,
    justifyContent: 'center',
    width: 85,
  },
  avatar: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 2.5,
    top: 2.5,
  },
});
