import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';

const InfoRow = ({ text, img, row, navigation }) => {

    const onPressRow = () => {
        navigation.navigate(row)
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={onPressRow}>
            <View style={styles.infoRow}>
                <Image style={{ width: 20, height: 20, tintColor: 'black', marginLeft: 10 }} source={img} />
                <Text style={styles.infoRowText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        height: 80,
        backgroundColor: '#e7e7e7',
        marginHorizontal: '5%',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    infoRowText: {
        color: colors.orange,
        fontSize: 18,
        marginLeft: 16
    }
});

export default InfoRow