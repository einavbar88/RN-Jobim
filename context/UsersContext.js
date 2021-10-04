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


    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token === null)
                return setIsSignUpOrIn(true)
            else {
                setStorageToken(token)
                axios.post(`${serverUrl}users/login-token`, {
                    token
                }).then(res => setUser(res.data))
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getToken()
    }, [])

    useEffect(() => {
        if (user?.user == null)
            return setIsSignUpOrIn(true)
        return setIsSignUpOrIn(false)
    }, [user])



    return (
        <UsersContext.Provider
            value={{
                user, setUser,
                isSignUpOrIn, setIsSignUpOrIn,
                changeUser, dipatchUserChanges,
                storageToken, setStorageToken
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;