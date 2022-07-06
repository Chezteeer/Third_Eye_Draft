import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, Platform,LogBox } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  ' Can\'t perform a React state update on an unmounted component'
]);

const data = [[121.0450627,14.7556602],
[121.0464367,14.7557834],
[121.0463428,14.7557808],
[121.046249,14.7557639],
[121.0461759,14.75576],               
[121.0461216,14.7557555],
[121.0460672,14.7557509],
[121.0460324,14.7557438],
[121.0460002,14.7557445],
[121.0459573,14.7557406],
[121.0459043,14.7557347],
[121.0458614,14.7557289],
[121.0458151,14.7557244],
[121.0457691,14.7557211],
[121.0457262,14.7557198],
[121.0456685,14.7557081],
[121.0456162,14.7557003],
[121.04557,14.755699],
[121.0455123,14.7556925],
[121.0454687,14.7556912],
[121.0454238,14.7556861],
[121.0453831,14.7556854],
[121.0453429,14.7556857],
[121.0453107,14.755678],
[121.0452661,14.7556776],
[121.0452503,14.7556767],
[121.0452255,14.755676],
[121.0452151,14.7556747],
[121.0451937,14.7556734],
[121.0451752,14.7556724],
[121.0451605,14.7556718],
[121.0451498,14.7556711],
[121.0451367,14.7556711],
[121.0451246,14.7556708],
[121.0451095,14.7556692],
[121.0450948,14.7556666],
[121.0450827,14.755666],
[121.0450727,14.7556666],
[121.0465373,14.7557704]]

export default function MapPage ({route}){
  const navigation = useNavigation()
  const {socket,details} = route.params
  const [markers,setMarkers] = useState([]); 
  const [assistantThere,setAssistantThere] = useState(false);
  const [isPassed,setIsPassed] = useState(false);

  // const changeCoords = () => {
  //   if (!isPassed) {
  //     let i = 0;
  //     setIsPassed(true);
  //     let s = setInterval(() => {
  //         if (i < data.length) {
  //           console.log([{
  //             latitude:data[data.length - 1][1],
  //             longitude:data[data.length - 1][0],
  //           },{
  //             latitude:data[i][1],
  //             longitude:data[i][0],
  //           }])
  //           setMarkers([{
  //             latitude:data[data.length - 1][1],
  //             longitude:data[data.length - 1][0],
  //           },{
  //             latitude:data[i][1],
  //             longitude:data[i][0],
  //           }])
  //           i++;
  //         } else clearInterval(s);
  //     },5000);
  //   }
  // }

  useEffect(() => {
    socket.on("data",({data,type}) => {
      switch(type) {
        case "help-map-data":
          console.log("MAP",type)
          setMarkers([{
            latitude:data.pwd.lat,
            longitude:data.pwd.lng,
          },{
            latitude:data.assistant.lat,
            longitude:data.assistant.lng,
          }])
          break;
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
  },[]);
  

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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          zoomEnabled={true}
        >
          {
            markers.map((val,index) => (
              <Marker key={val.latitude + index} coordinate={{
                latitude: val.latitude,
                longitude: val.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
                <CustomMarker />
                {/* <Callout>
                    <Text> PWD. </Text>
                </Callout> */}
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