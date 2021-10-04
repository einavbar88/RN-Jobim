import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import MenuIcon from './MenuIcon'
import colors from '../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import { serverUrl } from '../env/env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const DrawerContent = (props, setUser, user, storageToken, setStorageToken) => {


    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token')
            await axios.post(`${serverUrl}users/logout`, { body: '' }, { headers: { 'Authorization': `Bearer ${storageToken}` } })
            setUser(null)
            setStorageToken('')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerTopSection}>
                    <Image style={{ width: 30, height: 30 }} source={require("../icons/icon_menu_pic_placeholder.png")} />
                    <Text style={{ marginTop: 25 }}>{user?.user?.firstName}</Text>
                    <TouchableOpacity onPress={logout}>
                        <Text style={{ color: colors.orange }}>התנתקות</Text>
                    </TouchableOpacity>
                </View>
                <DrawerItem
                    icon={() => (<MenuIcon color="black" img={require('../icons/icon_menu_my_jobs.png')} />)}
                    onPress={() => { props.navigation.navigate("MyDetailsScreen") }}
                    style={styles.normalDrawerItem}
                    label="הפרטים שלי"
                    labelStyle={styles.normalDrawerItemLabel}
                />
                <DrawerItem
                    icon={() => (<MenuIcon color="black" img={require('../icons/icon_menu_notifications.png')} />)}
                    label="התראות"
                    onPress={() => { props.navigation.navigate("AlertsScreen") }}
                    labelStyle={styles.normalDrawerItemLabel}

                />

                <DrawerItem
                    icon={() => (<MenuIcon color="black" img={require('../icons/icon_menu_my_jobs_v2.png')} />)}
                    label="הג'ובים שלי"
                    onPress={() => { props.navigation.navigate("MyJobsScreen") }}
                    labelStyle={styles.normalDrawerItemLabel}

                />
                <View style={styles.seperator} />

                <DrawerItem
                    icon={() => (<MenuIcon color={colors.orange} img={require('../icons/loading_indicator_jobi.png')} />)}
                    label="מצא ג'ובים"
                    onPress={() => { props.navigation.navigate("MainScreen") }}
                    labelStyle={styles.orangeDrawerItemLabel}

                />
                <View style={styles.seperator} />

                <DrawerItem
                    icon={() => (<MenuIcon img={require('../icons/icon_menu_sochen.png')} />)}
                    label="הסוכן החכם"
                    onPress={() => { }}
                    labelStyle={styles.orangeDrawerItemLabel}

                />

                <View style={styles.seperator} />

                <DrawerItem
                    icon={() => (<MenuIcon color={colors.orange} img={require('../icons/icon_menu_about.png')} />)}
                    label="קצת עלינו"
                    onPress={() => { }}
                    labelStyle={styles.orangeDrawerItemLabel}

                />

                <View style={styles.seperator} />

                <DrawerItem
                    icon={() => (<MenuIcon color="darkgray" img={require('../icons/icon_menu_new.png')} />)}
                    label="פרסם ג'וב חדש"
                    onPress={() => { props.navigation.navigate("NewJobPostScreen") }}
                    labelStyle={styles.grayDrawerItemLabel}

                />

                <View style={styles.seperator} />

            </DrawerContentScrollView>
            <View style={styles.imgContainer}  >
                <Image style={styles.img} source={require('../icons/logo.png')} />
            </View>
        </>

    )
}

const styles = StyleSheet.create({

    drawerTopSection: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    normalDrawerItemLabel: {
        textAlign: 'left',
        fontSize: 20
    },
    orangeDrawerItemLabel: {
        textAlign: 'left',
        color: colors.orange,
        fontSize: 20

    },
    grayDrawerItemLabel: {
        textAlign: 'left',
        color: 'darkgray',
        fontSize: 22
    },
    seperator: {
        width: '92%',
        height: 1,
        alignItems: 'flex-end',
        backgroundColor: "black"
    },
    imgContainer: {
        position: 'absolute',
        width: '100%',
        height: windowHeight,
        top: 0,
        alignItems: 'center',
    },
    img: {
        width: '70%',
        height: 50,
        resizeMode: 'stretch',
        position: 'absolute',
        bottom: -50,

    }
});

export default DrawerContent

