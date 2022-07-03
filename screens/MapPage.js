import React, { useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MapPage ({route}){
  const {socket} = route.params

  const [markers,setMarkers] = useState([]);  

  socket.on("data",({data,type}) => {
    switch(type) {
      case "help-map-data":
        setMarkers([{
          latitude:data.pwd.lat,
          longitude:data.pwd.lng,
        },{
          latitude:data.assistant.lat,
          longitude:data.assistant.lng,
        }])
        break;
      case "help-request-done":
        break;
      default:
        break;
    }
  })

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
          latitude: markers[1]?.latitude || 14.7556602,
          longitude: markers[1]?.longitude || 121.0450627,
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