import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, SafeAreaView } from 'react-native';
import { UsersContext } from '../../context/UsersContext';
import SignUpScreen from './SignUpScreen';


const windowWidth = Dimensions.get('window').width;


const SignUpOrInContainer = () => {

    const { setIsSignUpOrIn, setUser, setStorageToken } = useContext(UsersContext)

    const [isSignUp, setIsSignUp] = useState(true)

    const storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token + "")
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = async (user, token) => {
        setIsSignUpOrIn(false)
        setUser(user)
        storeToken(token)
        setStorageToken(token)
    }

    const props = {
        isSignUp,
        setIsSignUp,
        onSubmit,
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SignUpScreen {...props} />
            <View style={{ width: windowWidth - 150, height: 120 }}>
                <Image source={require("../../icons/bkg_newjob_1.png")} style={styles.img} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
})


export default SignUpOrInContainer;