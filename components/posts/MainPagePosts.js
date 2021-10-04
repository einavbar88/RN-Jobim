import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import jobs from '../../data/jobs'
import LocationBar from "./LocationBar";
import PostPage from "./PostPage";

import { getCoordinates, getCurrentLocation, getDistanceFromLatLonInKm } from "../../auxFunc";


const MainPagePosts = ({ data, onPress, isPostPage }) => {

    const { company, branch, role, adTitle, address, imageUrl } = data

    const [location, setLocation] = useState(null);
    const [coordinates, setCoordinates] = useState(null)
    const [distance, setDistance] = useState(null)


    useEffect(() => {
        getCoordinates(address, setCoordinates)
        getCurrentLocation(setLocation);
        return () => {
            setDistance(null)
            setCoordinates(null)
            setLocation(null)
        }
    }, []);


    useEffect(() => {
        if (coordinates && location && !distance) {
            const { longitude, latitude } = location.coords
            const dist = getDistanceFromLatLonInKm(latitude, longitude, coordinates[0], coordinates[1])
            setDistance(dist.toFixed(3))
        }
    }, [coordinates, location])


    return (
        <TouchableOpacity activeOpacity={1} style={{ ...styles.postCard, backgroundColor: jobs[role].color, margin: isPostPage ? 0 : 5 }} disabled={isPostPage} onPress={onPress}>
            <Text style={styles.postCardTitle} >{`${company + (branch ? " " + branch : "")} מחפשת ${jobs[role].name}`}</Text>
            <View style={styles.iconContainer}>
                <Image source={jobs[role].icon} style={styles.icon} />
            </View>
            <Text style={styles.postCardText} >{adTitle}</Text>
            {imageUrl ?
                <View style={styles.postImageContainer}>
                    <View style={{ ...styles.shape, borderTopColor: jobs[role].color, }} />
                    <Image style={styles.postImage} source={imageUrl} />
                </View> :
                isPostPage ? <View style={{ ...styles.postImageContainer, height: 20 }}>
                    <View style={styles.whiteShape} />
                </View> : <></>
            }
            {isPostPage ? <PostPage data={data} distance={distance} coordinates={coordinates} /> :
                <LocationBar address={address} distance={distance} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    postCard: {
        alignItems: 'center',
        paddingTop: 15

    },
    postCardTitle: {
        color: 'white',
        fontWeight: '700',
    },
    iconContainer: {
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 70,
        width: 70,
        borderRadius: 50,
        marginVertical: 10
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        tintColor: "white"
    },
    postCardText: {
        color: 'white',
        fontSize: 12,
        marginBottom: 10
    },
    postImageContainer: {
        width: '100%',
        height: 200,
        overflow: 'hidden'
    },
    shape: {
        width: "100%",
        height: 0,
        zIndex: 10,
        position: "absolute",
        borderTopWidth: 30,
        borderLeftWidth: 400,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    whiteShape: {
        width: "100%",
        height: 0,
        zIndex: 10,
        borderBottomColor: 'white',
        position: "absolute",
        borderBottomWidth: 50,
        borderRightWidth: 1000,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    postImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    locationContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5
    },
    locationTextContainer: {
        flexDirection: 'row',
        alignItems: "center"

    },
    locationText: {
        fontSize: 12
    }
});

export default MainPagePosts