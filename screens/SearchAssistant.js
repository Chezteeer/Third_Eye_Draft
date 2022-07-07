import React, { useState } from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  ' Can\'t perform a React state update on an unmounted component'
]);

const SearchAssistant = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {socket} = route.params
  const [isConfirmed,setIsConfirmed] = useState(false);
  const [isArrived,setIsArrived] = useState(false);
  const [assistantId,setAssistantId] = useState("");
  const [activityId,setActivityId] = useState("");
  const [pwdId,setPwdId] = useState("");
  
  socket.on("data",({data,type}) => {
    switch(type) {
      case "help-confirmed":
        setIsConfirmed(true);
        setAssistantId(data.assistantId)
        setActivityId(data.activityId)
        setPwdId(data.pwdId)
        break;
      case "help-map-done":
        setIsArrived(true);
        break;
      case "request-done":
        navigation.navigate("BlindSuccess",{
          pwdId,
          activityId,
          assistantId,
          socket
        });
        break;
      default:
        break;
    }
  })

  const requestDone = () => {
    socket.emit("request-done",{pwdId,assistantId,activityId})
  }

  if (!isArrived) {
    if (isConfirmed) {
      return (
        <SafeAreaView style={styles.container('#d0fdfe')}>
          <Image style={styles.helpLogo} source={require('../assets/images/assistedonway.gif')}/>
          <Text adjustsFontSizeToFit style={styles.text2}>Your assistant is on his way to you...</Text>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={styles.container()}>
          <Image style={styles.helpLogo} source={require('../assets/images/searchAssistant.gif')}/>
          <Text adjustsFontSizeToFit style={styles.text1}> Searching for your assistant nearby... </Text>
        </SafeAreaView>
      )
    }
  } else {
    return (
      <SafeAreaView style={styles.container()}>
        <TouchableOpacity style={styles.helpLogo} onLongPress={requestDone}>
          <Image style={styles.helpLogo} source={require('../assets/images/searchAssistant.gif')}/>
        </TouchableOpacity>
        <Text adjustsFontSizeToFit style={styles.text1}> Your assistant has arrived! Press and hold the screen once done.</Text>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
    container:(bgc = '#fa5b43') => ({
      flex: 1,
      padding: 24,
      backgroundColor:bgc,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }),
    text1: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      marginTop: 20,
      marginBottom: 'auto',
      textShadowColor: 'rgba(0, 0, 0, 0.30)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      color: '#FFF',
    },
    text2: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      marginTop: 20,
      marginBottom: 'auto',
      textShadowColor: 'rgba(0, 0, 0, 0.30)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    helpLogo: {
      marginTop: 'auto',
      alignSelf: 'center',
      width: 256,
      height: 256,
  },
  text2:{
    fontSize: 18,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      textShadowColor: 'rgba(0, 0, 0, 0.10)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
  }
});

export default SearchAssistant