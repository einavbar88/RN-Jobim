import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { menuBtn } from './MainScreen';

export const alertsScreenOptions = (navigation) => ({
    headerLeft: () => (menuBtn(navigation))
})

const AlertsScreen = () => {
    return (
        <View style={styles.screen}>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {

    }
});

export default AlertsScreen