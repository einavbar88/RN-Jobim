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

    const { isSignUpOrIn, setUser, user, changeUser, dipatchUserChanges, storageToken, setStorageToken } = useContext(UsersContext)
    const { newPostDetails, dispatchNewPostDetails } = useContext(PostsContext)

    const [entryTimeout, setEntryTimeout] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            return setEntryTimeout(false)
        }, 2000)
        dispatchNewPostDetails({ type: "RESET" })
    }, [])

    return (
        entryTimeout ?
            <View style={styles.screen}>
                <Image style={styles.img} source={require('../icons/bg.jpeg')} />
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
                                ...myDetailsScreenOptions(navigation, route, { changeUser, dipatchUserChanges, user, setUser, storageToken })
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
                                ...mainScreenOptions(navigation)
                            })} />
                        <Drawer.Screen
                            name="NewJobPostScreen"
                            component={NewJobPostScreen}
                            options={({ navigation, route }) => ({
                                title: "פרסם ג'וב חדש",
                                ...newJobPostScreenOptions(navigation, route, { newPostDetails, dispatchNewPostDetails, storageToken })
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