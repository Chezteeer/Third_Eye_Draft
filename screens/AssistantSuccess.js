import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox, View, Touchable} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  ' Can\'t perform a React state update on an unmounted component'
]);
import axios from "axios";

const AssistantSuccess = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const api = axios.create({baseURL:"http://34.226.92.92:8080"});
  const {pwdId,assistantId,activityId,points,socket,details} = route.params;

  const rate = (rate) => {
    api.post("/rate",{
      raterId: assistantId,
      receiverId: pwdId,
      rate,
      type:0,
      activityId,
      review: ""
    }).then(({data}) => {
      if (data.success) {
        navigation.navigate("AssistantSuccess2",{points,socket,details})
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.helpLogo} source={require('../assets/images/award.gif')}/>
      <Text adjustsFontSizeToFit style={styles.text1}> The work here is done! </Text>
      <Text adjustsFontSizeToFit style={styles.text2}> How would you rate your assisted PWD? </Text>
      <View style={{marginTop: 10,}}>
        {
          [1,2,3,4,5].map(num => (
            <TouchableOpacity style={styles.rateButton} key={`num-${num}`}>
                <Text style={styles.rateButtonText} onPress={() => rate(num)}> {num} Star </Text>
            </TouchableOpacity>
          ))
        }
      </View>
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
      marginTop: 70,
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

export default AssistantSuccess