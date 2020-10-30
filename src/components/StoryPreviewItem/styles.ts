import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    position: 'relative',
    zIndex: 0,
  },
  gradientContainer: {
    alignItems: 'center',
    borderRadius: 90 / 2,
    height: 90,
    justifyContent: 'center',
    width: 90,
  },
  avatar: {
    left: 6,
    position: 'absolute',
    top: 6,
  },
});
