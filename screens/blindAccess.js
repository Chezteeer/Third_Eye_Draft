import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Details = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {io} = route.params

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.helpLogo} onLongPress={() => navigation.navigate('BlindAssistType', {io})}>
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
  rateButton:{
    marginTop: 10,
    backgroundColor: '#0CCF08',
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1.5,
    width: '50%',
    height: '9%',
    alignSelf: 'center',
    elevation: 5,
    marginBottom: 5,
},
rateButtonText:{
    fontSize: 16,
    fontFamily: 'FredokaOne',
    textAlign: 'center',
    color: '#fff',
    marginTop: 'auto',
    marginBottom: 'auto',
    textShadowColor: 'rgba(0, 0, 0, 0.30)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
},
});

export default Details