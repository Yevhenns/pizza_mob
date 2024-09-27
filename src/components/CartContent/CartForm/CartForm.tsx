import React from 'react';
import {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import {MaskedTextInput} from 'react-native-mask-text';

import {sendOrder} from '../../../redux/cart/cartOperations';
import {addInfo, getOrderSum} from '../../../redux/cart/cartSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox/Checkbox';
import {styles} from './CartForm.styles';

interface CartFormProps {
  openModal: () => void;
  order: Ordered;
}

export function CartForm({openModal, order}: CartFormProps) {
  const [addressShown, setAddressShown] = useState(false);

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<Info>({mode: 'onChange'});

  const orderSum = useAppSelector(getOrderSum);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Info> = data => {
    openModal();
    const customerInfo: Info = {
      address: data.address,
      comment: data.comment,
      delivery: data.delivery,
      name: data.name,
      number: data.number,
    };
    dispatch(addInfo(customerInfo));
    const reqBody: SummaryOrder = {customerInfo, order, orderSum};
    dispatch(sendOrder(reqBody));
  };

  const handleShowDeliveryAddress = () => {
    setAddressShown(!addressShown);
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        rules={{
          required: true,
          validate: {
            required: value => value.trim().length > 1,
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.fieldset}>
            <Text style={styles.label}>Ім'я</Text>
            <TextInput
              style={styles.input}
              placeholder="Введіть ім'я"
              placeholderTextColor={'grey'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="name"
      />
      <View style={styles.errorContainer}>
        {errors.name && (
          <Text style={styles.errorMessage}>Це обов'язкове поле!</Text>
        )}
      </View>

      <Controller
        control={control}
        rules={{
          required: true,
          validate: {
            required: value => value.length === 15,
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.fieldset}>
            <Text style={styles.label}>Номер телефону</Text>
            <MaskedTextInput
              mask="(099) 999-99-99"
              style={styles.input}
              placeholder="(099) 999-99-99"
              placeholderTextColor={'grey'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="number-pad"
            />
          </View>
        )}
        name="number"
      />
      <View style={styles.errorContainer}>
        {errors.number && (
          <Text style={styles.errorMessage}>Це обов'язкове поле!</Text>
        )}
      </View>

      <Checkbox label="Доставка" handleChange={handleShowDeliveryAddress} />

      {addressShown && (
        <>
          <Controller
            control={control}
            rules={
              addressShown
                ? {
                    required: true,
                    validate: {
                      required: value => value!.trim().length > 1,
                    },
                  }
                : {}
            }
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.fieldset}>
                <Text style={styles.label}>Адреса</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Введіть адресу"
                  placeholderTextColor={'grey'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="address"
          />
          <View style={styles.errorContainer}>
            {errors.address && (
              <Text style={styles.errorMessage}>Це обов'язкове поле!</Text>
            )}
          </View>
        </>
      )}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.fieldset}>
            <Text style={styles.label}>Коментар</Text>
            <TextInput
              style={styles.input}
              placeholder="Введіть коментар"
              placeholderTextColor={'grey'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        )}
        name="comment"
      />

      <Text>* обов'язкові поля</Text>
      <Button onPress={handleSubmit(onSubmit)}>Підтвердити</Button>
    </View>
  );
}
