import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    position: 'relative',
    zIndex: 0,
  },
  gradientContainer: {
    alignItems: 'center',
    borderRadius: 70 / 2,
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  avatar: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 40,
    left: 1,
    top: 1,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
