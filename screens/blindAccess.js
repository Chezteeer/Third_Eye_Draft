import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Details = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {io} = route.params

  const socket = io("http://34.226.92.92:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmMwMzUzNWRkNTBmOWMxN2E5ZmY0OWQiLCJ0eXBlIjoxLCJpYXQiOjE2NTY3NjM3NzR9.cKZr5yYBoBQ0hLPh2fgTYhU2mEtNCpZY9wVLcuhI37g",{transports:["websocket"]})

  socket.on("connect",() => {
    console.log("PWD Connected")
  })

  const requestHelp = () => {
    socket.emit("request",{
      helpType: "Others",
      userId: "62c03535dd50f9c17a9ff49d"
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.helpLogo} onLongPress={() => navigation.navigate('BlindAssistType', {socket})}>
        <Image style={styles.helpLogo} source={require('../assets/images/lookForHelp.gif')}/>
      </TouchableOpacity>
      <Text adjustsFontSizeToFit style={styles.text1}  onLongPress={() => navigation.navigate('MapPage')}> Long press the middle of the screen to request assistance from helpers!  </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 24,
      backgroundColor: '#e3e2e2',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    text1: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      marginTop: 20,
      marginBottom: 'auto',
      textShadowColor: 'rgba(0, 0, 0, 0.10)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    helpLogo: {
      marginTop: 'auto',
      alignSelf: 'center',
      width: 256,
      height: 256,
  },
});

export default Details