import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const AssistantHelpingUI = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const {sock} = route.params;

  // socket.on("request-done",data => {
  //   console.log(data)
  // })

  return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.helpLogo} source={require('../assets/images/helpProgress.gif')}/>
        <Text style={styles.text1}> You are currently helping somebody! {'\n'} Wait for them to confirm!</Text>
    </SafeAreaView>
  )
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

export default AssistantHelpingUI