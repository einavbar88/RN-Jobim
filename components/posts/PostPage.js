import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import colors from "../../styles/colors";
import LocationBar from "./LocationBar";
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import { serverUrl } from '../../env/env'
import axios from "axios";
import { UsersContext } from "../../context/UsersContext";


const PostPage = ({ data, coordinates, distance }) => {

    const { jobDescription, addressText, ownerId, _id } = data
    const { storageToken, user, setUser } = useContext(UsersContext)
    const [ownerData, setOwnerData] = useState(null)

    const getOwnerData = async () => {
        const owner = await axios.get(`${serverUrl}users/${ownerId}`)
        setOwnerData(owner.data)
    }

    const addRemoveFavorites = async () => {
        const res = await axios.patch(`${serverUrl}user/${ownerId}/favorites?post=${_id}`, {}, {
            headers: { 'Authorization': `Bearer ${storageToken}` }
        })
        setUser(res.data)
    }

    useEffect(() => {
        getOwnerData()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.btnsContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.btnContainer} onPress={() => Linking.openURL(`sms:${ownerData.phoneNumber}`)}>
                    <View style={{ ...styles.btnImageContainer, paddingVertical: 10 }}>
                        <Image source={require("../../icons/icons8-speech-bubble-30.png")} style={styles.btnImage} />
                    </View>
                    <Text>שלח הודעה</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={styles.btnContainer} onPress={() => Linking.openURL(`tel:${ownerData.phoneNumber}`)}>
                    <View style={{ ...styles.btnImageContainer, paddingVertical: 10 }}>
                        <Image source={require("../../icons/icons8-phone-30.png")} style={styles.btnImage} />
                    </View>
                    <Text>התקשר</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.btnContainer} onPress={() => Linking.openURL(`mailto:${ownerData.phoneNumber}`)}>
                    <View style={styles.btnImageContainer}>
                        <Image source={require("../../icons/icon_mail_about.png")} style={styles.btnImage} />
                    </View>
                    <Text>שלח מייל</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{jobDescription}</Text>
            </View>
            <View style={styles.mapContainer}>
                <View style={styles.shape} />
                {coordinates &&
                    <MapView
                        style={styles.map}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        initialRegion={{
                            latitude: coordinates.lat,
                            longitude: coordinates.lng,
                            latitudeDelta: 0.007,
                            longitudeDelta: 0.007,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }}
                        />
                    </MapView>
                }

                <LocationBar address={addressText} isPostPage={true} distance={distance} />
            </View>
            <View style={{ ...styles.btnsContainer, alignItems: 'flex-start' }}>
                <TouchableOpacity activeOpacity={1} style={styles.bottomBtnsContainer}>
                    <View style={styles.bottomBtnImageContainer}>
                        <Image source={require("../../icons/btn_delete_job_normal.png")} style={styles.bottomBtnImage} />
                    </View>
                    <Text style={styles.bottomBtnsText}>הסתר ג'וב</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.bottomBtnsContainer}>
                    <View style={styles.bottomBtnImageContainer}>
                        <Image source={require("../../icons/btn_share_job_normal.png")} style={styles.bottomBtnImage} />
                    </View>
                    <Text style={styles.bottomBtnsText}>שתף עם חברים</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.bottomBtnsContainer}>
                    <View style={styles.bottomBtnImageContainer}>
                        <Image source={require("../../icons/btn_more_by_them_job_normal.png")} style={styles.bottomBtnImage} />
                    </View>
                    <Text style={styles.bottomBtnsText}>ג'ובים נוספים למעסיק זה</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.bottomBtnsContainer} onPress={addRemoveFavorites}>
                    <View style={styles.bottomBtnImageContainer}>
                        {user.user?.favorites.length > 0 && user.user?.favorites.includes(_id) ?
                            <Image source={require("../../icons/btn_favorite_job_selected.png")} style={styles.bottomBtnImage} /> :
                            <Image source={require("../../icons/btn_favorite_job_normal.png")} style={styles.bottomBtnImage} />
                        }
                    </View>
                    <Text style={styles.bottomBtnsText}>הוסף למועדפים</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: "100%"
    },
    btnsContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
        marginVertical: 15
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    btnImageContainer: {
        paddingVertical: 15,
        paddingHorizontal: 12,
        width: 50,
        height: 50,
        backgroundColor: colors.orange,
        borderRadius: 50
    },
    btnImage: {
        width: '100%',
        height: '100%',
        tintColor: 'white',
    },
    descriptionContainer: {
        paddingHorizontal: '10%'
    },
    description: {
        fontSize: 12,
        textAlign: "center"
    },
    mapContainer: {
        position: 'relative',
    },
    map: {
        width: '100%',
        height: 150,
    },
    shape: {
        width: "100%",
        height: 0,
        zIndex: 10,
        position: "absolute",
        borderTopColor: "white",
        borderTopWidth: 30,
        borderRightWidth: 400,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    bottomBtnsContainer: {
        width: '20%',
        alignItems: "center",
        justifyContent: 'center',
    },
    bottomBtnImageContainer: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    bottomBtnImage: {
        width: '100%',
        height: '100%',
        tintColor: colors.orange,
    },
    bottomBtnsText: {
        color: colors.orange,
        fontSize: 12,
        textAlign: "center"
    }
})

export default PostPage