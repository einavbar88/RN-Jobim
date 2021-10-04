import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../../../styles/colors';



const JobFilterListItem = ({ data, shape, state, onPress }) => {

    const checkbox = {
        empty: shape ? require('../../../icons/abc_btn_radio_to_on_mtrl_000.png') : require('../../../icons/abc_btn_check_to_on_mtrl_000.png'),
        fill: shape ? require('../../../icons/abc_btn_radio_to_on_mtrl_015.png') : require('../../../icons/abc_btn_check_to_on_mtrl_015.png'),
    }

    return (
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => onPress(data.name)}>
            <View style={styles.textContainer}>
                <View style={styles.checkboxContainer}>
                    <Image source={state ? checkbox.fill : checkbox.empty} style={{ ...styles.img, tintColor: state ? colors.orange : '#aaa' }} />
                </View>
                <Text style={{ color: "#aaa" }}>
                    {data.name}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Image source={data.icon} style={{ ...styles.img, tintColor: data.color }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#aaa',
        borderBottomWidth: 1
    },
    iconContainer: {
        width: 60,
        height: 60,
        margin: 5
    },
    checkboxContainer: {
        width: 36,
        height: 36,
        margin: 5
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
});

export default JobFilterListItem;