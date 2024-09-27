import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export const GoogleMap: React.FC = () => {
  const initialRegion = {
    latitude: 48.4211840588917,
    longitude: 35.00988524052585,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.wrapper}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        <Marker
          coordinate={{
            latitude: 48.407641691999906,
            longitude: 35.00017456670064,
          }}
        />
        <Marker
          coordinate={{
            latitude: 48.42555310026097,
            longitude: 35.022020774202005,
          }}
        />
        <Marker
          coordinate={{
            latitude: 48.43342155185263,
            longitude: 35.00226293664556,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
});
