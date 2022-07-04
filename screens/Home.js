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
         <Image style={styles.splashLogo} source={require('../assets/images/newLogo.gif')}/>
         <Text style={styles.splashText}> The Third Eye Application </Text>
         <Text adjustsFontSizeToFit style={styles.motto}> Request for assistance anytime, anywhere.</Text>
         <Text adjustsFontSizeToFit style={styles.instructionText} onPress={() => navigation.navigate('Details', {io})}> Swipe Left if you want to seek help.</Text>
         <Text adjustsFontSizeToFit style={styles.instructionText2} onPress={() => navigation.navigate('AssistantRegister', {io})}> Swipe Right if you want to help.</Text>
         <Text adjustsFontSizeToFit style={styles.instructionText2} onPress={() => ws()}>[ Test WSs ]</Text>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f23b8f',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Para maiwasan mahide yung content sa likod ng statusbar
    },
    splashLogo: {
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 300,
        height: 256,
    },
    splashText: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'FredokaOne',
        fontSize: 20,
        elevation: 5,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    instructionText: {
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'FredokaOne',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        color: 'white',
    },
    instructionText2: {
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'FredokaOne',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        color: 'white',
    },
    motto:{
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: '#fff'
    }
});

export default Home