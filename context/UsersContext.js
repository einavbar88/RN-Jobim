import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverUrl } from '../env/env';
import ChangeUserReducer from '../reducers/ChangeUserReducer';

export const UsersContext = React.createContext()

const UsersProvider = (props) => {

    const [user, setUser] = useState(null)
    const [isSignUpOrIn, setIsSignUpOrIn] = useState(true)
    const [changeUser, dipatchUserChanges] = useReducer(ChangeUserReducer, {})
    const [storageToken, setStorageToken] = useState('')
    const [appStartDelay, setAppStartDelay] = useState(true)

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token === null) {
                setAppStartDelay(false)
                return setIsSignUpOrIn(true)
            }
            else {
                setStorageToken(token)
                axios.post(`${serverUrl}users/login-token`, {
                    token
                }).then(res => {
                    setUser(res.data)
                    setAppStartDelay(false)
                }).catch(e => {
                    setAppStartDelay(false)
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    useEffect(() => {
        if (!user || !user?.user)
            setIsSignUpOrIn(true)
        else
            setIsSignUpOrIn(false)
    }, [user])



    return (
        <UsersContext.Provider
            value={{
                user, setUser,
                isSignUpOrIn, setIsSignUpOrIn,
                changeUser, dipatchUserChanges,
                storageToken, setStorageToken,
                appStartDelay, setAppStartDelay
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;