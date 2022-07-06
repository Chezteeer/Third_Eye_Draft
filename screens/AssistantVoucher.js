import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const AssistantVoucher = () => {
  const navigation = useNavigation(); // Para makapag navigate

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.assistantPointContainer}>
            <Image style={styles.assistantPointImage} source={require('../assets/images/userIcon.png')}/>
                <Text adjustsFontSizeToFit={true} style={styles.voucherContainerText}> (Username Here) </Text>
            <Image style={styles.assistantPointImage} source={require('../assets/images/coinpoint.png')}/>
                <Text adjustsFontSizeToFit={true} style={styles.voucherContainerText}> (num) pts.</Text>
            <Image style={styles.assistantPointImage} source={require('../assets/images/coupon.png')}/>
                <Text adjustsFontSizeToFit={true} style={styles.voucherContainerText}> (num) pcs.</Text>
        </View>
        <View style={styles.voucherContainer}>
            <Text adjustsFontSizeToFit={true} style={styles.voucherContainerHeader}> Vouchers List </Text>
                <Text adjustsFontSizeToFit={true} style={{fontFamily: 'FredokaOne', fontSize: 11, textAlign: 'center',}}> Exchange your points to usable vouchers! </Text>
            <View style={styles.couponContainer}>
                <View style={{flexDirection:'row', top: 4}}>
                    <Image style={styles.couponLogo} source={require('../assets/images/shopee.png')}/>
                    <Text adjustsFontSizeToFit={true} style={styles.couponHeader}> Shopee Voucher PHP50 - 1000pts. {'\n'} <Text style={styles.couponDescription}>A 50 pesos worth voucher to be redeemed in {'\n'} Shopee Philippines!</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.couponContainer}>
            <View style={{flexDirection:'row', top: 4}}>
                    <Image style={styles.couponLogo} source={require('../assets/images/lazada.png')}/>
                    <Text adjustsFontSizeToFit={true} style={styles.couponHeader}> Lazada Voucher PHP50 - 1000pts. {'\n'} <Text style={styles.couponDescription}>A 50 pesos worth voucher to be redeemed in {'\n'} Lazada Philippines!</Text>
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
});

export default AssistantVoucher