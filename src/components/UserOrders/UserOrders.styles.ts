import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  userInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    flex: 1,
  },

  heading: {
    fontSize: 24,
  },

  text: {
    fontSize: 20,
  },

  orderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1,
  },

  order: {
    borderBottomWidth: 1,
    borderColor: 'tomato',
    borderRadius: 10,
    padding: 5,
  },

  titleQuantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  optionsWrapper: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
});
