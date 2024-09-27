import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

import {Heart} from '../../../../components/icons/Heart';
import {HeartFilled} from '../../../../components/icons/HeartFilled';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  addToFavoriteAction,
  getFavorites,
  removeFromFavoriteAction,
} from '../../../../redux/products/productsSlice';
import {IconButton} from '../../../IconButton';

interface ProductDescriptionProps {
  item: Product;
}

export function ProductDescription({item}: ProductDescriptionProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {_id, photo, title, description, dimension, promotion} = item;

  const favoriteProducts = useAppSelector(getFavorites);

  const dispatch = useAppDispatch();

  const addToFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavoriteAction(_id));
      Toast.show({
        type: 'info',
        text1: 'Видалено з улюблених',
        visibilityTime: 1500,
      });
    } else {
      dispatch(addToFavoriteAction(item));
      Toast.show({
        type: 'success',
        text1: 'Додано в улюблені',
        visibilityTime: 1500,
      });
    }
  };

  useEffect(() => {
    const checkIsFavoriteProducts = () => {
      return favoriteProducts.some(item => item._id === _id);
    };
    setIsFavorite(checkIsFavoriteProducts);
  }, [_id, favoriteProducts]);

  return (
    <View style={styles.descriprionWrapper}>
      <View>
        <Image
          style={styles.img}
          source={{uri: photo}}
          width={200}
          height={200}
        />
        {promotion && (
          <View style={styles.promotion}>
            <Text style={styles.promotionText}>Акція</Text>
          </View>
        )}
        <View style={styles.favorite}>
          <IconButton aria-label="add to favorite" onPress={addToFavorite}>
            {!isFavorite ? (
              <Heart color={'#de612b'} />
            ) : (
              <HeartFilled color={'#de612b'} />
            )}
          </IconButton>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description}</Text>
        <Text style={styles.text}>{dimension}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  descriprionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24,
    color: '#000000',
  },

  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#989898',
  },

  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  promotion: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#de612b',
    width: 64,
    height: 24,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  promotionText: {
    fontFamily: 'Comfortaa-SemiBold',
    color: 'white',
  },

  favorite: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
