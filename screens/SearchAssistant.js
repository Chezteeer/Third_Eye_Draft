import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const SearchAssistant = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {io} = route.params

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.helpLogo} source={require('../assets/images/searchAssistant.gif')}/>
      <Text adjustsFontSizeToFit style={styles.text1}> Searching for your assistant nearby... </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 24,
      backgroundColor: '#fa5b43',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
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