import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View, TouchableOpacity, Alert,Button,Modal,Pressable,LogBox} from 'react-native'
import MapView, { Marker } from "react-native-maps";
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from "axios"
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    ' Can\'t perform a React state update on an unmounted component'
  ]);

const HelperUI = ({route}) => {
    const navigation = useNavigation();
    const api = axios.create({baseURL:"http://34.226.92.92:8080"})

    const {token,socket,details,points,uphelp,ucop,up} = route.params;
    console.log(details)
    const [showModal,setShowModal] = useState(false)
    const [helpType,setHelpType] = useState("");
    const [isActive,setIsActive] = useState(details.available);
    const [pwdId,setPwdId] = useState("");
    const [upoints,setUpoints] = useState(up ? up : 0);
    const [uh,setUh] = useState(0);
    const [uc,setUc] = useState(ucop ? ucop : 0);

    socket.on("data",({data,type}) => {
        if (isActive) {
            switch(type) {
                case "help": 
                    setShowModal(true)
                    setHelpType(data.helpType)
                    setPwdId(data.userId)
                    break;
                case "help-confirmed-feedback":
                    navigation.navigate('MapPage',{socket,details})
                    break;
                default: 
                break;
            }
        } else setShowModal(false)
    })

    const toggleActiveness = () => {
        api.put("/user",{userId:details._id,status: !isActive}).then(({data}) => {
            if (data.success) setIsActive(!isActive)
            else Alert.alert("Error","Cannot update availability. Please try again.")
        })
    }

    const acceptRequest = () => {
        setShowModal(false)
        socket.emit("confirm",{
            pwdId,
            assistantId: details._id
        })
    }

    useEffect(() => {
        api.get("/user/updated",{
            params: {
                userId:details._id
            }
        }).then(({data}) => {
            console.log("HERE",data);
            setUpoints(data.points);
            setUh(data.helps);
            setUc(data.coupons);
        })
    },[]);

return (
    <SafeAreaView styles={styles.container}>
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
              <Text style={styles.modalText}> A PWD needs help! </Text>
            </View>
            <View style={styles.modal_body}>
              <Text style={styles.modalDescription}> A nearby PWD needs help with the following type! {'\n'} ({helpType})</Text>
            </View>
            <View style={{flexDirection: 'row',}}>
              {/* Button 1 */}
            <Pressable
              onPress={acceptRequest}
              style={styles.accept_button}
              android_ripple={{color:'#fff'}}
            >
              <Text style={styles.modalDescription}> Accept it! </Text>
            </Pressable>
            {/* Button 2 */}
            <Pressable
              onPress={() => setShowModal(false)}
              style={styles.decline_button}
              android_ripple={{color:'#fff'}}
            >
              <Text style={styles.modalDescription}> Decline it. </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
                        <Text style={styles.achievementText}> {up ? up : upoints ? upoints + (points ? points : 0)  : details.points + (points ? points : 0) - (details.coupons * 1000)} pts. </Text>
                        <Image style={styles.helpStat} source={require('../assets/images/help_01.png')}/>
                        <Text  style={styles.achievementText}> {uh ? uh + (uphelp ? 1 : 0) : details.helps + (uphelp ? 1 : 0)} helps. </Text>
                        <Image style={styles.helpStat} source={require('../assets/images/coupon.png')}/>
                        <Text  style={styles.achievementText}> {ucop ? ucop : uc ? uc : details.coupons} coupons. </Text>
                    </View>
                    <View style={styles.rewardButton}>
                        <TouchableOpacity style={styles.giftIcon} onPress={() => navigation.navigate('AssistantVoucher',{points:up ? up : details.points - (details.coupons * 1000),username:details.username,coupons:ucop ? ucop : details.coupons,userId:details._id,details,socket,uphelp: details.helps + (uphelp ? 1 : 0)})}>
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
                        <Image style={{width:110,height:110,alignSelf:"center",}} source={{uri:details.imageURL}} />
                    </View>

                        {/* First Column sa ID Infos */}
                    <View style={styles.idUserInfo}>
                        <Text style={styles.idTextInfo}> Name: </Text>
                        <View style={styles.idInfoContainer}>
                            <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 16,}}> {details.fullName} </Text>
                        </View>
                        <Text style={styles.idTextInfo}> Sex: </Text>
                        <View style={styles.idInfoContainer}>
                            <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 16,}}> {details.sex} </Text>
                        </View>
                        <Text style={styles.idTextInfo}> Helper ID: </Text>
                        <View style={styles.idInfoContainer}>
                            <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 16,}}> ASSI-03 </Text>
                        </View>
                        
                    </View>

                        {/* Second Column sa ID Infos */}
                    <View style={styles.idUserInfo}>
                        <Text style={styles.idTextInfo}> Age: </Text>
                        <View style={styles.idInfoContainer}>
                            <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 16,}}> {details.age} </Text>
                        </View>
                        <Text style={styles.idTextInfo}> Contact No.: </Text>
                        <View style={styles.idInfoContainer}>
                            <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 14 ,}}> {details.contactNumber} </Text>
                        </View>
                        <Text style={styles.idTextInfo}> Trust Factor: </Text>
                        <View style={styles.idInfoContainer}>
                            <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 16,}}> {details.rate}</Text>
                        </View>
                        
                    </View>
                </View>

                        {/* Address and Extra Information */}
                <View style={styles.idAddrAndExtraInfo}>
                    <Text style={styles.idTextInfo}> Address: </Text>
                    <View style={styles.idInfoContainerExtended}>
                        <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 12,}}> {details.address} </Text>
                    </View>
                    <Text style={styles.idTextInfo}> Extra Information: </Text>
                    <View style={styles.idInfoContainerExtended}>
                        <Text style={{fontFamily: 'FredokaOne', marginTop: 'auto', fontSize: 12,}}> Hey! I'm an official assistant! </Text>
                    </View>
                </View>
                
            </View>
            <View style={styles.availableButton(isActive)}>
                <Text style={styles.availableButtonText(isActive)}  onPress={toggleActiveness}> I'm{isActive ? "" : " not"} available! </Text>
            </View>
                <Text style={styles.availabilityText}> This will allow you to receive {"\n"} requests and earn rewards! </Text>
                
        </View>
        <View>
            <Text style={styles.availabilityText}> Tap the map to view the  {"\n"} real-time locations of PWDs! </Text>
            <TouchableOpacity onPress={() => navigation.navigate('MapPage',{socket})}>
                <Image style={styles.gear} source={require('../assets/images/map.png')}/>
            </TouchableOpacity>
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
        height: '71%',
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
    imagePic: {

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
        height: 20,
    },
    idInfoContainerExtended:{
        marginLeft: 3,
        marginTop: 4,
        backgroundColor: '#C2C2C2',
        width: '95%',
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
    availableButton:(isActive = true) => ({
        bottom: 5,
        backgroundColor: isActive ? '#0CCF08' : "#333",
        borderRadius: 25,
        borderColor: "black",
        borderWidth: 1.5,
        width: '50%',
        height: '10%',
        alignSelf: 'center',
        elevation: 5,
    }),
    availableButtonText:(isActive = true) => ({
        fontSize: 25,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: isActive ? '#fff' : "#ccc",
        marginTop: 'auto',
        marginBottom: 'auto',
    }),
    availabilityText:{
        marginTop: 15,
        fontSize: 16,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
    },
    gear:{
        width: 128,
        height: 128,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 'auto',
    },
    mapContainer:{
        width: 350,
        backgroundColor: 'grey',
        height: 125,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
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

export default HelperUI