import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

const LocationBar = ({ isPostPage, address, distance }) => {



    const postPageStyle = {
        ...styles.locationContainer,
        backgroundColor: '#ffffffce',
        position: 'absolute',
        bottom: 0

    }

    return (
        <View style={isPostPage ? postPageStyle : styles.locationContainer}>
            <View style={styles.locationTextContainer}>
                <View style={{ width: 10, height: 15, marginVertical: 5, marginRight: 5 }}>
                    <Image source={require("../../icons/icon_job_address.png")} style={{ ...styles.postImage, tintColor: isPostPage ? 'black' : 'white' }} />
                </View>
                <Text style={{ ...styles.locationText, color: isPostPage ? 'black' : 'white' }}>{`${address?.street + " " + address?.number}, ${address?.city}`}</Text>
            </View>
            <Text style={{ ...styles.locationText, fontWeight: '700', color: isPostPage ? 'black' : 'white' }}>{distance} ק"מ ממני </Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
        paddingHorizontal: 5,
    },
    locationTextContainer: {
        flexDirection: 'row',
        alignItems: "center"

    },
    locationText: {
        fontSize: 12
    }
});

export default LocationBar