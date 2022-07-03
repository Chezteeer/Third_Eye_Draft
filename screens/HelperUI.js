import React from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const HelperUI = ({route}) => {
const navigation = useNavigation(); // Para makapag navigate
const {token,socket,details} = route.params;

    console.log("UI",token)

    socket.on("data",(data) => {
        console.log(data);
    })

return (
    <SafeAreaView styles={styles.container}>
        <View style={styles.pastelcontainer}>
            <View style={styles.userStats}>
                <View style={styles.iconStatLayout}> 
                <TouchableOpacity onPress={() => navigation.navigate('inDevelopment')}>
                    <Image style={styles.userIcon} source={require('../assets/images/userIcon.png')}/>
                </TouchableOpacity>
                    <View style={styles.userTag}>
                        <Text adjustsFontSizeToFit style={styles.tagText}> Helper</Text>
                    </View>
                    <View style={styles.achievementSection}>
                        <Image style={styles.coinPoint} source={require('../assets/images/coinpoint.png')}/>
                        <Text style={styles.achievementText}> 60 pts. </Text>
                        <Image style={styles.helpStat} source={require('../assets/images/help_01.png')}/>
                        <Text  style={styles.achievementText}> 3 helps. </Text>
                        <Image style={styles.helpStat} source={require('../assets/images/coupon.png')}/>
                        <Text  style={styles.achievementText}> 2 coupons. </Text>
                    </View>
                    <View style={styles.rewardButton}>
                        <TouchableOpacity style={styles.giftIcon} onPress={() => navigation.navigate('inDevelopment')}>
                            <Image style={styles.giftIcon} source={require('../assets/images/gift.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.idContainer}>
                <View style={styles.idHeader}>
                    <Text style={styles.idTextHeader}> Verified Helper ID </Text>
                </View>
                <View style={styles.idPicAndInfo}>
                    <View style={styles.idPicture}>
                        {/* Picture Dito? */}
                    </View>

                        {/* First Column sa ID Infos */}
                    <View style={styles.idUserInfo}>
                        <Text style={styles.idTextInfo}> Name: </Text>
                        <View style={styles.idInfoContainer}>
                        </View>
                        <Text style={styles.idTextInfo}> Sex: </Text>
                        <View style={styles.idInfoContainer}>

                        </View>
                        <Text style={styles.idTextInfo}> Helper ID: </Text>
                        <View style={styles.idInfoContainer}>

                        </View>
                        
                    </View>

                        {/* Second Column sa ID Infos */}
                    <View style={styles.idUserInfo}>
                        <Text style={styles.idTextInfo}> Age: </Text>
                        <View style={styles.idInfoContainer}>

                        </View>
                        <Text style={styles.idTextInfo}> Contact No.: </Text>
                        <View style={styles.idInfoContainer}>

                        </View>
                        <Text style={styles.idTextInfo}> Trust Factor: </Text>
                        <View style={styles.idInfoContainer}>

                        </View>
                        
                    </View>
                </View>

                        {/* Address and Extra Information */}
                <View style={styles.idAddrAndExtraInfo}>
                    <Text style={styles.idTextInfo}> Address: </Text>
                    <View style={styles.idInfoContainerExtended}>

                    </View>
                    <Text style={styles.idTextInfo}> Extra Information: </Text>
                    <View style={styles.idInfoContainerExtended}>

                    </View>
                </View>
                
            </View>
            <View style={styles.availableButton}>
                <Text style={styles.availableButtonText}  onPress={() => navigation.navigate('inDevelopment')}> I'm available! </Text>
            </View>
                <Text style={styles.availabilityText}> This will allow you to receive {"\n"} requests and earn rewards! </Text>
                
        </View>
        <View>
        <Image style={styles.gear} source={require('../assets/images/gear.png')}/>
        <Text style={styles.availabilityText}> This part is under development. </Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Para maiwasan mahide yung content sa likod ng statusbar
        backgroundColor: 'white',
    },
    pastelcontainer:{
        height: '74%',
        backgroundColor: '#DFFFF6',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        elevation: 10,
    },
    userStats:{
        height: 100,
    },
    userStatsText:{
        fontSize: 24,
        fontFamily: 'FredokaOne',
    },
    userIcon:{
        top: 10,
        left: 25,
        marginLeft: '5%',
        marginTop: '1%',
        height: 32,
        width: 32,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1.5,
        borderColor: "black",
    },
    userTag:{
        top: 37,
        right: 34,
        width: 49,
        height: 17,
        backgroundColor: '#F6EE25',
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1.5,
        elevation: 3
    },
    tagText:{
        fontFamily: 'FredokaOne',
        fontSize: 11,
        justifyContent: 'center',
        textAlign: 'center',
    },
    iconStatLayout:{
        flexDirection: 'row',
        flex: 1,
    },
    achievementSection:{
        marginTop: '3.5%',
        backgroundColor: '#fff',
        height: '35%',
        width: '65%',
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1.5,
        elevation: 3,
        flexDirection: 'row',
        paddingLeft: 6,
        paddingTop: 8,
        paddingBottom: 8,
    },
    coinPoint:{
        width: 22,
        height: 22,
        alignSelf: 'center',
    },
    helpStat:{
        marginLeft: 5,
        width: 22,
        height: 22,
        alignSelf: 'center',
    },
    achievementText:{
        marginTop: 2,
        fontFamily: 'FredokaOne',
        fontSize: 10,
    },
    rewardButton:{
        backgroundColor: '#68CF6C',
        right: 30,
        top: 8,
        height: 48,
        width: 48,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1.5,
        borderColor: "black",
        elevation: 6,
    },
    giftIcon:{
        width: 24,
        height: 24,
        marginTop: 'auto',
        marginBottom: 'auto',
        alignSelf: 'center',
    },
    idContainer:{
        bottom: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        width: '91%',
        height: '49%',
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1.5,
        elevation: 5,
    },
    idTextHeader:{
        fontSize: 12,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
    },
    idHeader:{
        bottom: 1.5,
        backgroundColor: '#0CCF08',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "black",
        borderWidth: 1.5,
        width: '50%',
        alignSelf: 'center',
    },
    idPicture:{
        backgroundColor: '#C2C2C2',
        left: 11,
        top: 17,
        height: 108,
        width: 108,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderColor: "black",
    },
    idPicAndInfo:{
        flexDirection: 'row',
    },
    idUserInfo:{
        marginLeft: 20,
        marginTop: 8,
    },
    idInfoContainer:{
        marginLeft: 1,
        backgroundColor: '#C2C2C2',
        width: 100,
        height: 16,
    },
    idInfoContainerExtended:{
        marginLeft: 3,
        marginTop: 4,
        backgroundColor: '#C2C2C2',
        width: 225,
        height: 16,
    },
    idTextInfo:{
        marginTop: 5,
        fontSize: 12,
        fontFamily: 'FredokaOne',
    },
    idAddrAndExtraInfo:{
        marginLeft: 10,
        marginTop: 10,
    },
    availableButton:{
        bottom: 5,
        backgroundColor: '#0CCF08',
        borderRadius: 25,
        borderColor: "black",
        borderWidth: 1.5,
        width: '50%',
        height: '10%',
        alignSelf: 'center',
        elevation: 5,
    },
    availableButtonText:{
        fontSize: 25,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: '#fff',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    availabilityText:{
        marginTop: 15,
        fontSize: 16,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
    },
    gear:{
        width: 64,
        height: 64,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 'auto',
    }
})

export default HelperUI