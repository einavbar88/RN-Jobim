import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import FiltersBtn from '../components/posts/filters/FiltersBtn';
import PostModal from '../components/posts/PostModal';

import HeaderButton from '../components/ui/HeaderButton';
import { PostsContext } from '../context/PostsContext';
import { serverUrl } from '../env/env';


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


const windowWidth = Dimensions.get('window').width;

const MainScreen = (props) => {

    const { jobsList, setJobsList, location } = useContext(PostsContext)

    const getJobs = async () => {
        const jobs = await axios.get(`${serverUrl}jobs`)
        setJobsList(jobs.data)
    }

    useEffect(() => {
        if (jobsList.length === 0)
            getJobs()
    }, [])

    const applyFilters = () => {

    }

    return (
        <View style={styles.main}>
            <FiltersBtn applyFilters={applyFilters} />
            <FlatList
                data={jobsList}
                keyExtractor={job => job._id}
                renderItem={(job) => <PostModal data={job} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        // alignItems: 'center',
        width: windowWidth
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
});

export default MainScreen