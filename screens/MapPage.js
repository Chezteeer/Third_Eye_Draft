import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, Platform } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';


export default function MapPage ({route}){
  const navigation = useNavigation()
  const {socket,details} = route.params

  const [markers,setMarkers] = useState([]); 
  const [assistantThere,setAssistantThere] = useState(false);

  socket.on("data",({data,type}) => {
    console.log(data,type)
    switch(type) {
      // case "help-map-data":
      //   // setMarkers([{
      //   //   latitude:data.pwd.lat,
      //   //   longitude:data.pwd.lng,
      //   // },{
      //   //   latitude:data.assistant.lat,
      //   //   longitude:data.assistant.lng,
      //   // }])
      //   break;
      case "help-map-done":
        setAssistantThere(true);
        break;
      case "request-done":
        navigation.navigate("AssistantSuccess",{...data,socket,details})
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

  if (assistantThere) {
    return (
      <SafeAreaView style={styles.container}>
          <Image style={styles.helpLogo} source={require('../assets/images/helpProgress.gif')}/>
          <Text style={styles.text1}> You are currently helping somebody! {'\n'} Wait for them to confirm!</Text>
      </SafeAreaView>
    )
  } else {
    return(
      <View style={{
        flex: 1,
      }}>
        <MapView style={{
          flex: 1,
        }}
          // showsUserLocation={true}
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
              <Marker key={val.latitude} coordinate={{
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


}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: '#ffde5e',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text1: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'FredokaOne',
    marginTop: 20,
    marginBottom: 'auto',
  },
  helpLogo: {
    marginTop: 'auto',
    alignSelf: 'center',
    width: 256,
    height: 256,
},
});