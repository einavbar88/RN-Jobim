import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { menuBtn } from './MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangeName from './change-details/ChangeName';
import DetailsMain from './change-details/DetailsMain';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import axios from 'axios';
import { serverUrl } from '../env/env';
import ChangeCity from './change-details/ChangeCity';
import ChangeYear from './change-details/ChangeYear';
import ChangeEmail from './change-details/ChangeEmail';
import { upload } from '../auxFunc';

export const myDetailsScreenOptions = (navigation, route, context) => {

    const routeName = getFocusedRouteNameFromRoute(route) ?? 'main';
    const { changeUser, dipatchUserChanges, user, setUser, storageToken, setLoading } = context

    const onSave = async () => {
        setLoading(true)
        let img = user.user.avatar
        if (changeUser.avatar)
            img = await upload(changeUser.avatar)
        const newUser = await axios.patch(`${serverUrl}users/${user.user._id}`, { updates: { ...changeUser, avatar: img } }, { headers: { 'Authorization': `Bearer ${storageToken}` } })
        dipatchUserChanges('RESET')
        setLoading(false)
        navigation.goBack()
        setUser({ user: newUser.data })
    }

    return ({
        headerRight: () => {
            if (routeName === "main")
                return (
                    <TouchableOpacity>
                        <Text style={styles.settingsBtn}>הגדרות</Text>
                    </TouchableOpacity>
                )
            return (
                <TouchableOpacity onPress={onSave}>
                    <Text style={styles.settingsBtn}>שמור</Text>
                </TouchableOpacity>
            )
        },
        headerLeft: () => {
            if (routeName === "main")
                return (
                    menuBtn(navigation)
                )
            return (
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()} style={{ width: 13, height: 18, margin: 15 }}>
                    <Image source={require('../icons/btn_arrow_normal.png')} style={styles.btnImg} />
                </TouchableOpacity>
            )
        },
        title: getHeaderTitle(routeName)
    })
}


const getHeaderTitle = (routeName) => {
    switch (routeName) {
        case 'main':
            return 'הפרטים שלי';
        case 'name':
            return 'עריכת שם ותמונה';
        case 'city':
            return 'עריכת עיר מגורים';
        case 'birthYear':
            return 'עריכת שנת לידה';
        case 'email':
            return 'עריכת כתובת מייל';

    }
}


const Stack = createNativeStackNavigator()

const MyDetailsScreen = ({ route }) => {



    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={DetailsMain} />
            <Stack.Screen name="name" component={ChangeName} />
            <Stack.Screen name="city" component={ChangeCity} />
            <Stack.Screen name="birthYear" component={ChangeYear} />
            <Stack.Screen name="email" component={ChangeEmail} />
        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
    settingsBtn: {
        color: 'white',
        fontWeight: '700',
        marginRight: 8
    },
    btnImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    }
})

export default MyDetailsScreen