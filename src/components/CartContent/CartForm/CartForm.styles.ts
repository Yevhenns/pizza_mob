import {StyleSheet} from 'react-native';

import {colors} from '../../../assets/styleVariables';

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
    borderColor: colors.accentColor,
    borderWidth: 1,
  },

  label: {
    color: colors.blackColor,
  },

  errorContainer: {
    height: 20,
  },

  errorMessage: {
    color: colors.errorColor,
  },
});
