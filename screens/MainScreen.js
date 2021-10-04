import React from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import FiltersBtn from '../components/posts/filters/FiltersBtn';
import PostModal from '../components/posts/PostModal';

import HeaderButton from '../components/ui/HeaderButton';
import mockData from '../mock-data/mockData'

export const menuBtn = (navigation) => (
    <TouchableOpacity activeOpacity={1} style={{ height: 23, width: 30, marginLeft: 10 }} onPress={() => navigation.toggleDrawer()}>
        <Image source={require("../icons/btn_menu_normal.png")} style={styles.img} />
    </TouchableOpacity>
)

export const mainScreenOptions = (navigation) => ({
    headerLeft: () => (menuBtn(navigation)),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-location-outline' onPress={() => { navigation }} />
        </HeaderButtons>
    )
})

const MainScreen = (props) => {

    const applyFilters = () => {

    }

    return (
        <ScrollView style={styles.main}>
            <FiltersBtn applyFilters={applyFilters} />
            <PostModal data={mockData[0]} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    main: {
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
});

export default MainScreen