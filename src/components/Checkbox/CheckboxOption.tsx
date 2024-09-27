import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface CheckboxOptionProps extends TouchableOpacityProps {
  title: string;
  handleChange: (title: string, isChecked: boolean) => void;
}

export function CheckboxOption({title, handleChange}: CheckboxOptionProps) {
  const [isChecked, setIsChecked] = useState(false);

  const showOptions = () => {
    setIsChecked(!isChecked);
    handleChange(title, !isChecked);
  };

  return (
    <TouchableOpacity style={styles.checkbox} onPress={() => showOptions()}>
      <View style={styles.checkboxButton}>
        {!isChecked ? <View /> : <View style={styles.checkboxChecked} />}
      </View>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

CheckboxOption.displayName = 'Checkbox';

const styles = StyleSheet.create({
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flexDirection: 'row',
  },
  checkboxButton: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: '#de612b',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    width: 18,
    height: 18,
    backgroundColor: '#de612b',
    borderRadius: 4,
  },
  label: {
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
});
