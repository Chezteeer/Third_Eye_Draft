import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  ' Can\'t perform a React state update on an unmounted component'
]);

const BlindAssistType = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {socket} = route.params

  const broadcastRequest = (helpType) => {
    socket.emit("request",{
      helpType,
      userId: "62c03535dd50f9c17a9ff49d"
    });
    navigation.navigate('SearchAssistant',{socket})
  }

  return (
    <GestureRecognizer 
        style={styles.container}
        onSwipeLeft={() => broadcastRequest("Pickup or Delivery")}
        onSwipeRight={() => broadcastRequest("Others")}
        onSwipeUp={() => broadcastRequest("Chores")}
        onSwipeDown={() => broadcastRequest("Buy Stuff")}>
      <Image style={styles.helpLogo} source={require('../assets/images/blindassisttype1.gif')}/>
      <Text adjustsFontSizeToFit style={styles.text1}> Swipe depending what type of assistance you require.  </Text>
      <Text adjustsFontSizeToFit style={styles.text2}> Swipe Up: Chores  </Text>
      <Text adjustsFontSizeToFit style={styles.text2}> Swipe Down: Buy Stuff  </Text>
      <Text adjustsFontSizeToFit style={styles.text2}> Swipe Left: Pickup or Delivery  </Text>
      <Text adjustsFontSizeToFit style={styles.text2}> Swipe Right: Others  </Text>
    </GestureRecognizer>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 24,
      backgroundColor: '#b6d390',
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
  text2:{
    fontSize: 18,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      textShadowColor: 'rgba(0, 0, 0, 0.10)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
  }
});

export default BlindAssistType 