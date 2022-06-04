import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation(); // Para makapag navigate

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.helpLogo} source={require('../assets/images/helphand.png')}/>
      <Text adjustsFontSizeToFit style={styles.text1}> Double Tap to request help from nearby helpers! </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 24,
      backgroundColor: '#F1CD98',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    text1: {
      fontSize: 24,
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

export default Details