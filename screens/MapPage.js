import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MapPage (){

  const markers = [
    {
      latitude: 14.6536909,
      longitude: 120.949748,
      }, 
      {
        latitude: 14.6535062,
        longitude: 120.9482692,
      },
      {
        latitude: 14.6505363,
        longitude: 120.9477894,
      },
      {
        latitude: 14.6520482,
        longitude: 120.9502971,
      }, 
  ];

  const CustomMarker = () => {
    return(
      <View>
        <Icon name="location-history" size={50} color='#E74c3c' />
        <View style={{
          width: 30,
          height: 30,
          borderRadius: 50,
          backgroundColor: '#ECF0F1',
          position: 'absolute',
          left: 10,
          top: 8,
        }}>
          <Icon style={{
            textAlign: 'center',
            top: 5,
          }} name="accessible" size={20} color='#E74c3c' />
        </View>
      </View>
    )
  }

  return(
    <View style={{
      flex: 1,
    }}>
      <MapView style={{
        flex: 1,
      }}
        showsUserLocation={true}
        initialRegion={{
          latitude: 14.6529782,
          longitude: 120.9515357,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
        zoomEnabled={true}
      >
        {
          markers.map((val) => (
            <Marker coordinate={{
              latitude: val.latitude,
              longitude: val.longitude,
            }}>
              <CustomMarker />
              <Callout>
                  <Text> PWD. </Text>
              </Callout>
            </Marker>
          ))
        }
      </MapView>
    </View>
  )

}