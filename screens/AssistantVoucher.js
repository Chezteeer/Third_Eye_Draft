import React, { useState } from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View, TouchableOpacity, Alert, Modal, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AssistantVoucher = ({route}) => {
  const navigation = useNavigation(); // Para makapag navigate
  const api = axios.create({baseURL:"http://34.226.92.92:8080"})
  
  const {points, username,coupons,userId,details,socket,uphelp} = route.params;
  const [showModal,setShowModal] = useState(false)
  
  const [ucop,setUcop] = useState(coupons);
  const [up,setUp] = useState(points);

  const vouch = () => {
    if (up >= 1000) {
      api.put("/user",{
        userId,
        coupons: coupons + 1
      }).then(({data}) => {
        if (data.success) {
          setUp(up - 1000)
          setUcop(ucop + 1)
          setShowModal(true)
        }
      })
    } else Alert.alert("Insufficient Points","You don't have enough points to redeem this voucher")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={showModal}
        transparent
        onRequestClose={() =>
          setShowModal(false)
        }
        animationType='fade'
        hardwareAccelerated
      >
        <View style={styles.centered_view}>
          <View style={styles.request_modal}>
            <View style={styles.modal_title}>
              <Text style={styles.modalText}> Coupon Redeemed! </Text>
            </View>
            <View style={styles.modal_body}>
              <Text style={styles.modalDescription}> You have successfully redeemed your voucher! </Text>
            </View>
            <View style={{flexDirection: 'row',}}>
              {/* Button 1 */}
            <Pressable
              onPress={() => setShowModal(false)}
              style={styles.accept_button}
              android_ripple={{color:'#fff'}}
            >
              <Text style={styles.modalDescription}> Thanks! </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>

        <View style={styles.assistantPointContainer}>
            <Image style={styles.assistantPointImage} source={require('../assets/images/userIcon.png')}/>
                <Text adjustsFontSizeToFit={true} style={styles.voucherContainerText}> {username} </Text>
            <Image style={styles.assistantPointImage} source={require('../assets/images/coinpoint.png')}/>
                <Text adjustsFontSizeToFit={true} style={styles.voucherContainerText}> {up} pts.</Text>
            <Image style={styles.assistantPointImage} source={require('../assets/images/coupon.png')}/>
                <Text adjustsFontSizeToFit={true} style={styles.voucherContainerText}> {ucop} pcs.</Text>
        </View>
        <View style={styles.voucherContainer}>
            <Text adjustsFontSizeToFit={true} style={styles.voucherContainerHeader}> Vouchers List </Text>
                <Text adjustsFontSizeToFit={true} style={{fontFamily: 'FredokaOne', fontSize: 11, textAlign: 'center',}}> Exchange your points to usable vouchers! </Text>
                <View style={styles.couponContainer}>
                    <View style={{flexDirection:'row', top: 4}}>
                        <Image style={styles.couponLogo} source={require('../assets/images/shopee.png')}/>
                        <Text onPress={vouch} adjustsFontSizeToFit={true} style={styles.couponHeader}> Shopee Voucher PHP50 - 1000pts. {'\n'} <Text style={styles.couponDescription}>A 50 pesos worth voucher to be redeemed in {'\n'} Shopee Philippines!</Text>
                        </Text>
                    </View>
                </View>
            <View style={styles.couponContainer}>
            <View style={{flexDirection:'row', top: 4}}>
                    <Image style={styles.couponLogo} source={require('../assets/images/lazada.png')}/>
                    <Text onPress={vouch} adjustsFontSizeToFit={true} style={styles.couponHeader}> Lazada Voucher PHP50 - 1000pts. {'\n'} <Text style={styles.couponDescription}>A 50 pesos worth voucher to be redeemed in {'\n'} Lazada Philippines!</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.couponContainer}>
                <Text adjustsFontSizeToFit={true} style={{color: '#d9d9d9', marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', fontFamily:'FredokaOne', fontSize: 18}}> Coupon not available.</Text>
            </View>
            <View style={styles.couponContainer}>
                <Text adjustsFontSizeToFit={true} style={{color: '#d9d9d9', marginTop: 'auto', marginBottom: 'auto', textAlign: 'center', fontFamily:'FredokaOne', fontSize: 18}}> Coupon not available.</Text>
            </View>
        </View>
        <Text adjustsFontSizeToFit={true} style={{color: 'black', marginTop: 20, textAlign: 'center', fontFamily:'FredokaOne', fontSize: 18}}> More coupons available soon! </Text>
            <TouchableOpacity style={styles.rateButton}>
              <Text style={styles.rateButtonText} onPress={() => navigation.navigate('HelperUI',{ucop,up,details,socket,uph:uphelp})}> Go back. </Text>
            </TouchableOpacity>
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
    rateButton:{
      backgroundColor: '#0CCF08',
      borderRadius: 25,
      borderColor: "black",
      borderWidth: 1.5,
      width: '50%',
      height: '9%',
      alignSelf: 'center',
      elevation: 5,
      marginTop: 20
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
    assistantPointContainer:{
      marginTop: 20,
      width: '100%',
      height: '5%',
      flexDirection: 'row',
      backgroundColor: 'white',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 5,
      borderWidth: 2,
      borderRadius: 10,
      elevation: 5,
    },
    voucherContainer:{
      marginTop: 20,
      width: '100%',
      height: '60%',
      backgroundColor: 'white',
      padding: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderWidth: 2,
      borderRadius: 10,
      elevation: 5,
    },
    assistantPointImage:{
      width: 24,
      height: 24,
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 5,
    },
    voucherContainerText:{
      marginTop: 'auto',
      marginBottom: 'auto',
      fontFamily: 'FredokaOne',
      fontSize: 12,
      marginLeft: 2,
    },
    voucherContainerHeader:{
      fontFamily: 'FredokaOne',
      textAlign: 'center',
      fontSize: 18
    },
    couponContainer:{
      backgroundColor: '#f6f6f6',
      marginTop: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: '20%',
      borderWidth: 2,
      borderRadius: 10,
      padding: 5,
    },
    couponLogo:{
        width: 64,
        height: 64,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 5
    },
    couponHeader:{
        marginLeft: 5,
        fontFamily: 'FredokaOne',
        fontSize: 16,
    },
    couponDescription:{
        marginLeft: 5,
        fontFamily: 'FredokaOne',
        fontSize: 12,
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
    },
    centered_view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099'
    }
});

export default AssistantVoucher