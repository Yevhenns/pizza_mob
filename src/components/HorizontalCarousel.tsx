import React, {useEffect, useRef} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('screen');

const data = [
  'https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/g6kopv5fswwrxi0vys6a',
  'https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/swejyzvcyuwcpeqip4sy',
  'https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/ti0wittkvf5su8nhfbdy',
];

export function HorizontalCarousel() {
  const flatListRef = useRef<FlatList<any | null>>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % data.length;
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex.current,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={index => index.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={{uri: item}} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  imageWrapper: {
    width: width - 20,
    display: 'flex',
    alignItems: 'center',
  },

  image: {
    width: width - 20,
    height: 150,
    borderRadius: 10,
  },
});
