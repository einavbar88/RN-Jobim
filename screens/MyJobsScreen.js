import React from 'react'
import { menuBtn } from './MainScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabNav from '../components/ui/CustomTabNav';
import FavoritesTabAndEnquiries from '../components/FavoritesTabAndEnquiries';

export const myJobsScreenOptions = (navigation) => ({
    headerLeft: () => (menuBtn(navigation))
})

const Tab = createMaterialTopTabNavigator();

const fav = [], enq = []

const MyJobsScreen = () => {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabNav {...props} />}
        >
            <Tab.Screen name="מועדפים" component={FavoritesTabAndEnquiries} />
            <Tab.Screen name="פניתי ל..." component={FavoritesTabAndEnquiries} />
        </Tab.Navigator>
    );
}


export default MyJobsScreen