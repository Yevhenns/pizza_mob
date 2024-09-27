import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface CheckboxProps extends TouchableOpacityProps {
  label: string;
  handleChange: () => void;
  labelLeft?: boolean;
}

export function Checkbox({
  label,
  handleChange,
  labelLeft = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const showOptions = () => {
    handleChange();
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity
      style={[styles.checkbox, labelLeft ? styles.left : styles.right]}
      onPress={showOptions}>
      <View style={styles.checkboxButton}>
        {!isChecked ? <View /> : <View style={styles.checkboxChecked} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  left: {
    flexDirection: 'row-reverse',
  },
  right: {
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
    fontSize: 16,
    color: '#000000',
  },
});
