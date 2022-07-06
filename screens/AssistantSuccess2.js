import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox, View} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  ' Can\'t perform a React state update on an unmounted component'
]);

const BlindSuccess2 = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {points,socket,details} = route.params;

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.helpLogo} onLongPress={() => navigation.navigate('Details')}>
        <Image style={styles.helpLogo} source={require('../assets/images/award.gif')} onLongPress={() => navigation.navigate('BlindAssistType')}/>
      </TouchableOpacity>
      
      <Text adjustsFontSizeToFit style={styles.text1}> PWD feedback successfully sent!</Text>
      <Text adjustsFontSizeToFit style={styles.text2}> You have earned {points} points.</Text>
      <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText} onPress={() => navigation.navigate('HelperUI',{socket,details,points,uphelp:1})}> Go back. </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 24,
      backgroundColor: '#1b1e5f',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    text1: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      marginTop: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.30)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      color: '#FFF',
    },
    helpLogo: {
      marginTop: 'auto',
      alignSelf: 'center',
      width: 256,
      height: 256,
  },
  text2:{
    fontSize: 14,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      textShadowColor: 'rgba(0, 0, 0, 0.10)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      color: 'white',
      marginBottom: 'auto',
  },
  rateButton:{
    backgroundColor: '#0CCF08',
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1.5,
    width: '50%',
    height: '9%',
    alignSelf: 'center',
    elevation: 5,
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

export default BlindSuccess2