import React, { useState } from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, TouchableOpacity, LogBox, View, Touchable, Modal, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const BlindSuccess = () => {
  const navigation = useNavigation(); // Para makapag navigate
  const [showModal, setshowModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.modalText}> A PWD needs help! </Text>
            </View>
            <View style={styles.modal_body}>
              <Text style={styles.modalDescription}> A nearby PWD needs help with the following type! {'\n'} (insert type here)</Text>
            </View>
            <View style={{flexDirection: 'row',}}>
              {/* Button 1 */}
            <Pressable
              onPress={() => setshowModal(false)}
              style={styles.accept_button}
              android_ripple={{color:'#fff'}}
            >
              <Text style={styles.modalDescription}> Accept it! </Text>
            </Pressable>
            {/* Button 2 */}
            <Pressable
              onPress={() => setshowModal(false)}
              style={styles.decline_button}
              android_ripple={{color:'#fff'}}
            >
              <Text style={styles.modalDescription}> Decline it. </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* End of Modal */}
      
      <Image style={styles.helpLogo} source={require('../assets/images/award.gif')}/>
      <Text adjustsFontSizeToFit style={styles.text1}> The work here is done! </Text>
      <Text adjustsFontSizeToFit style={styles.text2}> How would you rate your assistant? </Text>
      <View style={{marginTop: 10,}}>
        <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText} onPress={() => navigation.navigate('BlindSuccess2')}> 1 star </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText} onPress={() => navigation.navigate('BlindSuccess2')}> 2 stars </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText} onPress={() => navigation.navigate('BlindSuccess2')}> 3 stars </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText} onPress={() => navigation.navigate('BlindSuccess2')}> 4 stars </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText} onPress={() => navigation.navigate('BlindSuccess2')}> 5 stars </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText} onPress={() => setshowModal(true)}> Test Modal </Text>
        </TouchableOpacity>
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

export default BlindSuccess