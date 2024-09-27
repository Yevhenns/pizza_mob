import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {showDniproWeather} from './showDniproWeather';

export function Weather() {
  const [weather, setWeather] = useState<[] | ForecastDay[]>([]);

  useEffect(() => {
    showDniproWeather().then((data: FilteredApiResponse) => {
      const newArray = data.map(item => {
        return {
          date: item.date.split('-').reverse().join('.'),
          avgtemp: item.day.avgtemp_c,
          conditionText: item.day.condition.text,
          icon: 'https:' + item.day.condition.icon,
        };
      });
      setWeather(newArray);
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Погода в Дніпрі</Text>
      <View style={styles.weatherList}>
        {weather.map(item => {
          return (
            <View key={item.date} style={styles.weatherListitem}>
              <Text style={styles.text}>{item.avgtemp} C°</Text>
              <Text style={styles.text}>{item.date}</Text>
              <Text style={[styles.text, styles.condition]}>
                {item.conditionText}
              </Text>
              <Image source={{uri: item.icon}} width={100} height={100} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },

  heading: {
    fontFamily: 'Comfortaa-SemiBold',
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },

  weatherList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

  weatherListitem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },

  text: {
    fontFamily: 'Comfortaa-SemiBold',
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },

  condition: {
    flexGrow: 1,
  },
});
