import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MenuIcon = ({ color, img }) => {

    return (
        <View style={styles.icon}>
            <Image style={{ width: 35, height: 35, tintColor: color }} source={img} />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {

    }
});

export default MenuIcon