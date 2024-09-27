import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    width: '100%',
  },

  fieldset: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  input: {
    width: '100%',
    padding: 12,
    borderRadius: 5,
    borderColor: '#de612b',
    borderWidth: 1,
  },

  label: {
    color: 'black',
  },

  errorContainer: {
    height: 20,
  },

  errorMessage: {
    color: 'red',
  },
});
