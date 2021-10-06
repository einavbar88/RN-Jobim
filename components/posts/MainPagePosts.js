import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import jobs from '../../data/jobs'
import LocationBar from "./LocationBar";
import PostPage from "./PostPage";

import { getDistanceFromLatLonInKm } from "../../auxFunc";
import { PostsContext } from "../../context/PostsContext";

const windowWidth = Dimensions.get('window').width;

const MainPagePosts = ({ data, onPress, isPostPage }) => {

    const { company, branch, role, adTitle, coords, addressText, imageUrl } = data.item

    const { location } = useContext(PostsContext)
    const [distance, setDistance] = useState(null)

    useEffect(() => {
        if (location && !distance) {
            const dist = getDistanceFromLatLonInKm(location.lat, location.lng, coords.lat, coords.lng)
            setDistance(dist.toFixed(3))
        }
    }, [location])


    return (
        <TouchableOpacity activeOpacity={1} style={{
            ...styles.postCard, backgroundColor: jobs[role].color, width: isPostPage ? windowWidth : windowWidth - 10
        }} disabled={isPostPage} onPress={onPress}>
            <Text style={styles.postCardTitle} >{`${company + (branch ? " " + branch : "")} מחפשת ${jobs[role].name}`}</Text>
            <View style={styles.iconContainer}>
                <Image source={jobs[role].icon} style={styles.icon} />
            </View>
            <Text style={styles.postCardText} >{adTitle}</Text>
            {imageUrl ?
                <View style={styles.postImageContainer}>
                    <View style={{ ...styles.shape, borderTopColor: jobs[role].color, }} />
                    <Image style={styles.postImage} source={{ uri: imageUrl }} />
                </View> :
                isPostPage ? <View style={{ ...styles.postImageContainer, height: 20 }}>
                    <View style={styles.whiteShape} />
                </View> : <></>
            }
            {isPostPage ? <PostPage data={data.item} distance={distance} coordinates={coords} /> :
                <LocationBar address={addressText} distance={distance} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    postCard: {
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 270,
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