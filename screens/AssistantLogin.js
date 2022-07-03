import React, {useState} from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View, TextInput, ScrollView, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Checkbox  from 'expo-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from "axios";

const AssistantLogin = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const api = axios.create({baseURL:"http://34.226.92.92:8080"})
  // User Information
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");

  const {io} = route.params

  // submit func
  const submit = () => {
    if (userName == "" || password == "")
    {
      Alert.alert("Error!", "Some required infos not filled up.");
    }
    else {
      api.post("/user/login",{username:userName,password}).then(({data}) => {
        if (data && data.success) {

          const socket = io(`http://34.226.92.92:8080?token=${data.token}`,{transports:["websocket"]})

          socket.on("connect",() => {
            console.log("connected")
            navigation.navigate('HelperUI',{
              socket,
              token:data.token,
              details: data.message
            })
          })

        }
      }).catch(error => console.log(error))
    }
  }

  return (
    <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.container}>
            <Image
                style={styles.loginLogo}
                source={require('../assets/images/blind.png')}/>
            <Text style={styles.text1}> Assistant Login </Text>
        </View>
        <View style={styles.loginFormContainer}>
            <Text adjustFontSizeToFit style={styles.formText}> Username: </Text>
            <TextInput 
              style={styles.formContainer} 
              value={userName} 
              onChangeText = {(inputData) => setUserName(inputData)}
              require/>

            <Text adjustFontSizeToFit style={styles.formText}> Password: </Text>
            <TextInput 
              style={styles.formContainer} 
              value={password} 
              onChangeText = {(inputData) => setpassword(inputData)}
              require/>

              <TouchableOpacity 
                 style={styles.registerButton}
                 onPress={() => submit()}>
                <Text adjustFontSizeToFit style={styles.registerButtonText}> Login </Text>
            </TouchableOpacity>
        </View>

        <Text adjustFontSizeToFit style={styles.loginText} onPress={() => navigation.navigate('HelperUI')}> Debug login. </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#DFFFF6',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  loginLogo: {
    marginTop: 125,
    width: 64,
    height: 64,
    alignSelf: 'center',
  },
  text1: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'FredokaOne',
    marginTop: 10,
    marginBottom: 10,
  },
  loginFormContainer:{
    padding: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1.5,
    width: '90%',
    height: 250,
    elevation: 5,
  },
  formText:{
    fontSize: 12,
    fontFamily: 'FredokaOne',
    marginTop: 5,
  },
  formContainer:{
    marginVertical: 5,
    backgroundColor: '#ede9e8',
    borderWidth: 2,
    height: '20%',
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 3,
    fontFamily: 'FredokaOne',
    fontSize: 12,
  },
    registerButton:{
    marginTop: 15,
      backgroundColor: '#0CCF08',
      borderRadius: 25,
      borderColor: "black",
      borderWidth: 1.5,
      width: '60%',
      height: '45%',
      alignSelf: 'center',
      elevation: 5,
  },
  registerButtonText:{
    fontSize: 16,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: '#fff',
        marginTop: 'auto',
        marginBottom: 'auto',
  },
  scrollViewStyle:{
    backgroundColor: '#DFFFF6',
  }
});

export default AssistantLogin