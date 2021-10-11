import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { getDistanceFromLatLonInKm } from '../auxFunc';
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

const MainScreen = (props) => {

    const { jobsList, setJobsList, location, setLocation, filters, setCurrentFilters, setLoading } = useContext(PostsContext)

    const getJobs = async (around, roles) => {
        setLoading(true)
        const jobs = (await axios.get(`${serverUrl}jobs/near-me`, {
            params: {
                ...around,
                roles
            }
        })).data
        setLoading(false)
        setJobsList(jobs.length > 0 ? jobs.sort((a, b) => {
            const aDistance = getDistanceFromLatLonInKm(a.coords.coordinates[1], a.coords.coordinates[0], location.lat, location.lng)
            const bDistance = getDistanceFromLatLonInKm(b.coords.coordinates[1], b.coords.coordinates[0], location.lat, location.lng)
            return aDistance > bDistance
        }) : [])
    }

    const applyFilters = () => {
        setCurrentFilters(filters)
        setLocation(filters.locationArea)
    }

    useEffect(() => {
        if (location)
            getJobs(location, filters.jobsTypes)
    }, [location])

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
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
});

export default MainScreen