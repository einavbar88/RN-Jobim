import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View, Text } from 'react-native';

import CustomInput from '../../components/ui/CustomInput';
import { UsersContext } from '../../context/UsersContext';

const windowWidth = Dimensions.get('window').width;

const ChangeEmail = () => {

    const { user, dipatchUserChanges } = useContext(UsersContext)

    const [email, setEmail] = useState(user.user.email)


    useEffect(() => {
        dipatchUserChanges({ type: "CHANGE_EMAIL", email })
    }, [email])

    useEffect(() => {
        return () => {
            dipatchUserChanges({ type: "RESET" })
        }
    }, [])


    return (
        <View style={styles.screen}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 30, fontSize: 16 }}>כתובת המייל שלך</Text>
                <Text style={{ fontSize: 14, marginVertical: 5 }}>(יש למלא כתובת מייל על מנת לפנות למעסיקים)</Text>
                <CustomInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="אימייל"
                    style={{ width: windowWidth - 30 }}
                />
            </View>

            <View style={{ width: windowWidth - 100, height: 150 }}>
                <Image source={require("../../icons/bkg_newjob_1.png")} style={styles.img} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
});


export default ChangeEmail;