import { StyleSheet } from 'react-native';

// TODO: extract to props
const colors = {
  primary: '#5D8FDB',
  lightPrimary: 'rgb(233,240,251)',
  secondary: '#5E5E5E',
  storyBorder: '#D3D3D3',
  lightSecondary: 'rgb(211,211,211)',
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)',
  facebook: '#3b5998',
  red: 'red',
};

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 18,
    borderWidth: 1,
  },
  placeholder: {
    backgroundColor: colors.primary,
  },
});
