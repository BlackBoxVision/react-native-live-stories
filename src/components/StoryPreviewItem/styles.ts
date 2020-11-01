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
    left: 2.5,
    position: 'absolute',
    top: 2.5,
  },
});
