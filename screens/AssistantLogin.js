import React, {useState} from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View, TextInput, ScrollView, Alert, Modal, Pressable,LogBox} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Checkbox  from 'expo-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from "axios";
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  ' Can\'t perform a React state update on an unmounted component'
]);

const AssistantLogin = ({route}) => {
  const baseUrl = "http://34.226.92.92:8080"

  const navigation = useNavigation(); // Para makapag navigate
  const api = axios.create({baseURL:baseUrl})
  // User Information
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [showModal, setshowModal] = useState(false);

  const {io} = route.params

  // submit func
  const submit = () => {
    if (userName == "" || password == "")
    {
      setshowModal(true);
    }
    else {
      api.post("/user/login",{username:userName,password}).then(({data}) => {
        if (data && data.success) {

          const socket = io(`${baseUrl}?token=${data.token}`,{transports:["websocket"]})

          socket.on("connect",() => {
            console.log("connected")
            navigation.navigate('HelperUI',{
              socket,
              token:data.token,
              details: data.message
            })
          })
        }
      }).catch(error => {
        if (error.response.status === 401) Alert.alert("Error!", "Invalid credentials.");
        else Alert.alert("Error!", "Unknown error occured.");
      })
    }
  }

  return (
    <ScrollView style={styles.scrollViewStyle}>
      {/* Start of Modal */}
     <Modal
        visible={showModal}
        transparent
        onRequestClose={() =>
          setshowModal(false)
        }
        animationType='fade'
        hardwareAccelerated
      >
        <View style={styles.centered_view}>
          <View style={styles.request_modal}>
            <View style={styles.modal_title}>
              <Text style={styles.modalText}> Error. </Text>
            </View>
            <View style={styles.modal_body}>
              <Text style={styles.modalDescription}> Please enter your registered  {'\n'}username and password. </Text>
            </View>
            <View>
              {/* Button 1 */}
            <Pressable
              onPress={() => setshowModal(false)}
              style={styles.accept_button}
              android_ripple={{color:'#fff'}}
            >
              <Text style={styles.modalDescription}> Okay. </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* End of Modal */}

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
  },
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099'
  },
  request_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  modal_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfc97',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modal_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accept_button:{
    backgroundColor:'#76dd76',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: 120,
    height: 40,
    borderWidth: 2,
    elevation: 5,
    
  },
  decline_button:{
    backgroundColor:'#ff6c6a',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: 120,
    height: 40,
    borderWidth: 2,
    elevation: 5,
  },
  modalText:{
      color: '#000000',
      fontSize: 20,
      margin: 10,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
  },
  modalDescription:{
    color: '#000000',
      fontSize: 14,
      marginTop: 'auto',
      marginBottom: 'auto',
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      textShadowColor: 'rgba(0, 0, 0, 0.10)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
  }
});

export default AssistantLogin