import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import io from "socket.io-client";
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

const Home = () => {
    const navigation = useNavigation(); // Para makapag navigate
    if (!window.location) {
        window.navigator.userAgent = 'ReactNative';
    }

  return (
    <SafeAreaView style={styles.container}>
         <Image style={styles.splashLogo} source={require('../assets/images/blind.png')}/>
         <Text style={styles.splashText}> Third Eye </Text>
         <Text adjustsFontSizeToFit style={styles.instructionText} onPress={() => navigation.navigate('Details', {io})}> Swipe Left if you want to seek help.</Text>
         <Text adjustsFontSizeToFit style={styles.instructionText2} onPress={() => navigation.navigate('AssistantRegister', {io})}> Swipe Right if you want to help.</Text>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#DFFFF6',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Para maiwasan mahide yung content sa likod ng statusbar
    },
    splashLogo: {
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 256,
        height: 256,
    },
    splashText: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'FredokaOne',
        fontSize: 20,
        elevation: 5,
    },
    instructionText: {
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'FredokaOne',
        fontSize: 18,
    },
    instructionText2: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'FredokaOne',
        fontSize: 18,
    },
});

export default Home