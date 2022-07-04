import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const BlindAssistType = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {socket} = route.params

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.helpLogo} source={require('../assets/images/blindassisttype1.gif')}/>
      <Text adjustsFontSizeToFit style={styles.text1}> Swipe depending what type of assistance you require.  </Text>
      <Text adjustsFontSizeToFit style={styles.text2} onPress={() => navigation.navigate('SearchAssistant', {socket,helpType:"Chores"})}> Swipe Up: Chores  </Text>
      <Text adjustsFontSizeToFit style={styles.text2} onPress={() => navigation.navigate('SearchAssistant', {socket,helpType:"Buy Stuff"})}> Swipe Down: Buy Stuff  </Text>
      <Text adjustsFontSizeToFit style={styles.text2} onPress={() => navigation.navigate('SearchAssistant', {socket,helpType:"Pickup or Delivery"})}> Swipe Left: Pickup or Delivery  </Text>
      <Text adjustsFontSizeToFit style={styles.text2} onPress={() => navigation.navigate('SearchAssistant', {socket,helpType:"Others"})}> Swipe Right: Others  </Text>
    </SafeAreaView>
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