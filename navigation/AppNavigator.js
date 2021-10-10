import React, { useContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from '../styles/colors';

import { UsersContext } from '../context/UsersContext';
import { PostsContext } from '../context/PostsContext';

import MainScreen, { mainScreenOptions } from '../screens/MainScreen';
import MyDetailsScreen, { myDetailsScreenOptions } from '../screens/MyDetailsScreen';
import NewJobPostScreen, { newJobPostScreenOptions } from '../screens/NewJobPostScreen';
import AlertsScreen from '../screens/AlertsScreen';
import MyJobsScreen from '../screens/MyJobsScreen';
import { Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';

import DrawerContent from '../components/DrawerContent';


import SignUpOrInContainer from '../screens/sign-up-login/SignUpOrInContainer';


const Drawer = createDrawerNavigator();

const defaultScreenOptions = () => ({
    headerStyle: {
        backgroundColor: colors.orange,
        height: 50,
    },
    headerTintColor: 'white',
    title: 'Centered',
    headerTitleAlign: 'center',
    drawerStyle: {
        backgroundColor: '#eee',
        width: '85%',
    },
    drawerPosition: 'right',
    drawerInactiveBackgroundColor: 'transparent',

})

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const AppNavigator = ({ navigation }) => {

    const { appStartDelay, isSignUpOrIn, setUser, user, changeUser, dipatchUserChanges, storageToken, setStorageToken } = useContext(UsersContext)
    const { newPostDetails, dispatchNewPostDetails, setLoading } = useContext(PostsContext)


    useEffect(() => {
        dispatchNewPostDetails({ type: "RESET" })
    }, [])

    return (
        appStartDelay ? <View style={styles.screen}>
            <Image style={styles.img} source={require('../assets/splash1.png')} />
        </View> :
            isSignUpOrIn ?
                <SignUpOrInContainer /> :
                <NavigationContainer>
                    <Drawer.Navigator drawerContent={props => DrawerContent(props, setUser, user, storageToken, setStorageToken)} initialRouteName="MainScreen" screenOptions={defaultScreenOptions}>
                        <Drawer.Screen
                            name="MyDetailsScreen"
                            component={MyDetailsScreen}
                            options={({ navigation, route }) => ({
                                title: "הפרטים שלי",
                                ...myDetailsScreenOptions(navigation, route, { changeUser, dipatchUserChanges, user, setUser, storageToken, setLoading })
                            })} />
                        <Drawer.Screen
                            name="AlertsScreen"
                            component={AlertsScreen}
                            options={({ navigation }) => ({
                                title: "התראות"
                            })} />
                        <Drawer.Screen
                            name="MyJobsScreen"
                            component={MyJobsScreen}
                            options={({ navigation }) => ({
                                title: "הג'ובים שלי",
                            })} />
                        <Drawer.Screen
                            name="MainScreen"
                            component={MainScreen}
                            options={({ navigation }) => ({
                                title: "JOBIM",
                                ...mainScreenOptions(navigation, setLoading)
                            })} />
                        <Drawer.Screen
                            name="NewJobPostScreen"
                            component={NewJobPostScreen}
                            options={({ navigation, route }) => ({
                                title: "פרסם ג'וב חדש",
                                ...newJobPostScreenOptions(navigation, route, { newPostDetails, dispatchNewPostDetails, storageToken, setLoading })
                            })} />

                    </Drawer.Navigator>
                </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
});

export default AppNavigator