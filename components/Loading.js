import React, { useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { PostsContext } from '../context/PostsContext';
import colors from '../styles/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Loading = () => {

    const { loading } = useContext(PostsContext)

    return (
        loading ? <View style={styles.screen}>
            <ActivityIndicator size='large' color={colors.orange} />
        </View> : <></>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: windowWidth,
        height: windowHeight + 100,
        zIndex: 10000,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ffffffee'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
});


export default Loading;