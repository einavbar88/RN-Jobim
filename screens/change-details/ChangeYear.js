import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, Text } from 'react-native';

import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { UsersContext } from '../../context/UsersContext';

const windowWidth = Dimensions.get('window').width;

const ChangeYear = () => {

    const { user, dipatchUserChanges } = useContext(UsersContext)

    const [birthYear, setBirthYear] = useState(user.user.birthYear)

    const currentYear = (new Date()).getFullYear() + 1

    const years = Array(currentYear - 1913).fill().map((_, idx) => 1900 + idx)

    useEffect(() => {
        dipatchUserChanges({ type: "CHANGE_YEAR", birthYear })
    }, [birthYear])

    useEffect(() => {
        return () => {
            dipatchUserChanges({ type: "RESET" })
        }
    }, [])


    return (
        <View style={styles.screen}>
            <Text style={{ marginTop: 30, fontSize: 16 }}>שנת הלידה שלך</Text>
            <WheelPickerExpo
                height={300}
                width={windowWidth}
                initialSelectedIndex={years.findIndex(num => num === birthYear)}
                items={years.map(num => ({ label: num, value: '' }))}
                onChange={({ item }) => setBirthYear(item.label)}
                selectedStyle={{ borderColor: '#000000', borderWidth: 1 }}
            />
            <View style={{ width: windowWidth - 100, height: 150 }}>
                <Image source={require("../../icons/bkg_newjob_1.png")} style={styles.img} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
});


export default ChangeYear;