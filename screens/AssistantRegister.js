import React, {useState} from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View, TextInput, ScrollView, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Checkbox  from 'expo-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Keyboard Avoiding Wrapper

const AssistantRegister = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const [agree, setAgree] = useState(false);

  // User Information
  const [fullName, setfullName] = useState("");
  const [userName, setUserName] = useState("");
  const [presentAddress, setpresentAddress] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [contactNumber, setcontactNumber] = useState("");

  const {io} = route.params

  // Form Submit
  const submit = () => {
    if (fullName == "" || userName == "" || presentAddress == "" || password == "" || confirmPassword == "" || contactNumber == "")
    {
      Alert.alert("Error!", "Some required infos not filled up.");
    }
    else
      Alert.alert("All infos filled up!", "Then pass through backend.");
  }

  return (
    <ScrollView style={styles.scrollViewStyle}>
    <View style={styles.container}>
        <View>
            <Image style={styles.helpLogo} source={require('../assets/images/help.png')}/>
            <Text adjustsFontSizeToFit style={styles.text1}> Assistant Registration Form </Text>
        </View>
        <View style={styles.regFormContainer}>
            <Text adjustFontSizeToFit style={styles.formText}> Full Name: </Text>
            <TextInput 
              style={styles.formContainer} 
              value={fullName} 
              onChangeText = {(inputData) => setfullName(inputData)}
              require/>

            <Text adjustFontSizeToFit style={styles.formText}> Present Address: </Text>
            <TextInput 
              style={styles.formContainer}
              value={presentAddress} 
              onChangeText = {(inputData) => setpresentAddress(inputData)}
              require/>

            <Text adjustFontSizeToFit style={styles.formText}> Contact Number: </Text>
            <TextInput style={styles.formContainer}
              value={contactNumber} 
              onChangeText = {(inputData) => setcontactNumber(inputData)}
              require/>

            <Text adjustFontSizeToFit style={styles.formText}> Username: </Text>
            <TextInput style={styles.formContainer} 
              value={userName} 
              onChangeText = {(inputData) => setUserName(inputData)}
              require/>

            <Text adjustFontSizeToFit style={styles.formText}> Password: </Text>
            <TextInput style={styles.formContainer}
              require
              autoCorrect={false}
              secureTextEntry={true}
              value={password} 
              onChangeText = {(inputData) => setpassword(inputData)}/>

            <Text adjustFontSizeToFit style={styles.formText}> Confirm Password: </Text>
            <TextInput style={styles.formContainer} 
              require 
              autoCorrect={false} 
              secureTextEntry={true}
              value={confirmPassword} 
              onChangeText = {(inputData) => setconfirmPassword(inputData)}/>

            <View style={styles.checkBoxStyle}>
              <Checkbox style={styles.check}
                value = {agree}
                onValueChange={() => setAgree(!agree)}
                  color = {agree ? "#4630EB" : undefined}
               />
              <Text style={styles.checkboxText}>Agree to the terms and condition of the application.</Text>
            </View>

            <View>
            <TouchableOpacity style={[
              styles.registerButton,
              {
                backgroundColor: agree ? "#0CCF08" : "grey",
              }
            ]}
            disabled={!agree}
            onPress={() => submit()}>
              
                <Text adjustFontSizeToFit style={styles.registerButtonText}> Register</Text>
            </TouchableOpacity>
            </View>
        </View>

        <Text adjustFontSizeToFit style={styles.loginText} onPress={() => navigation.navigate('AssistantLogin',{io})}> Already a registered assistant? {"\n"} Tap here to login.</Text>
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
    text1: {
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'FredokaOne',
      marginTop: 5,
      marginBottom: 'auto',
    },
    helpLogo: {
      marginTop: 10,
      width: 64,
      height: 64,
      alignSelf: 'center',
  },
  regFormContainer:{
        bottom: 25,
        padding: 12,
        marginVertical: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        height: 500,
        borderColor: "black",
        borderWidth: 1.5,
        elevation: 5,
  },
  formText:{
      fontSize: 12,
      fontFamily: 'FredokaOne',
      marginTop: 5,
  },
  checkBoxStyle:{
    fontFamily: 'FredokaOne',
    marginTop: 8,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 35,
  },
  checkboxText:{
    fontSize: 12,
    fontFamily: 'FredokaOne',
    marginLeft: 5,
    textAlignVertical: 'center',
  },
  formContainer:{
    marginVertical: 5,
    backgroundColor: '#ede9e8',
    borderWidth: 2,
    height: '7%',
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 3,
    fontFamily: 'FredokaOne',
    fontSize: 12,
  },
  scrollViewStyle:{
    backgroundColor: '#DFFFF6',
  },
  registerButton:{
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
  loginText:{
    fontSize: 14,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: '#000',
        bottom: 30,
  }
});

export default AssistantRegister