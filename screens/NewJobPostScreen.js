import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewJobTabNav from '../components/ui/NewJobTabNav';
import CompanyDetails from './new-job/CompanyDetails';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import JobTitle from './new-job/JobTitle';
import JobDescription from './new-job/JobDescription';
import { PostsContext } from '../context/PostsContext';
import JobLocation from './new-job/JobLocation';
import Attachments from './new-job/Attachments';
import { saveNewPost } from '../auxFunc';

export const newJobPostScreenOptions = (navigation, route, props) => ({
    headerRight: () => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'name';
        const { newPostDetails, storageToken } = props

        const onPressNext = async () => {
            switch (routeName) {
                case "name":
                    if (newPostDetails.name.name !== '')
                        navigation.navigate("job")
                    break
                case "job":
                    if (newPostDetails.job !== '')
                        navigation.navigate("description")
                    break
                case "description":
                    if (newPostDetails.description.title !== '')
                        navigation.navigate("location")
                    break
                case "location":
                    if (newPostDetails.locationValid)
                        navigation.navigate("attachment")
                    break
                case "attachment":
                    saveNewPost(newPostDetails, storageToken)
                        .then(res => navigation.navigate('MainScreen'))
                    break
            }
        }

        return (
            <TouchableOpacity activeOpacity={1} style={{ marginRight: 10 }} onPress={onPressNext}>
                <Text style={{ color: 'white', fontSize: 16 }}>{routeName === 'attachment' ? "שמור" : "הבא"}</Text>
            </TouchableOpacity>
        )
    },
    headerLeft: () => {
        const { dispatchNewPostDetails } = props

        return (
            <TouchableOpacity activeOpacity={1} style={styles.exitBtn} onPress={() => {
                dispatchNewPostDetails({ type: 'RESET' })
                navigation.navigate('MainScreen')
            }}>
                <Image source={require("../icons/ic_dialog_close_dark.png")} style={styles.exitBtnImage} />
            </TouchableOpacity>
        )
    }
})

const Tab = createMaterialTopTabNavigator();

const NewJobPostScreen = () => {

    const { newPostDetails, dispatchNewPostDetails } = useContext(PostsContext)

    useEffect(() => {
        dispatchNewPostDetails({ type: 'RESET' })
    }, [])


    return (
        <Tab.Navigator
            tabBar={props => <NewJobTabNav {...props} />}
            screenOptions={{
                swipeEnabled: false
            }}
        >
            <Tab.Screen name="name" component={CompanyDetails} />
            <Tab.Screen name="job" component={JobTitle} listeners={{
                tabPress: (e) => {
                    if (newPostDetails.name.name.trim() === '')
                        e.preventDefault()
                }
            }} />
            <Tab.Screen name="description" component={JobDescription} listeners={{
                tabPress: (e) => {
                    if (newPostDetails.name.name.trim() === '' || newPostDetails.job === '')
                        e.preventDefault()
                }
            }} />
            <Tab.Screen name="location" component={JobLocation} listeners={{
                tabPress: (e) => {
                    if (newPostDetails.name.name.trim() === '' || newPostDetails.job === '' || newPostDetails.description.title.trim() === '')
                        e.preventDefault()
                }
            }} />
            <Tab.Screen name="attachment" component={Attachments} listeners={{
                tabPress: (e) => {
                    if (newPostDetails.name.name.trim() === '' || newPostDetails.job === '' || newPostDetails.description.title.trim() === '' || !newPostDetails.locationValid)
                        e.preventDefault()
                }
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    exitBtn: {
        width: 23,
        height: 23,
        marginLeft: 10
    },
    exitBtnImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
});

export default NewJobPostScreen