import axios from 'axios';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CustomInput from '../../components/ui/CustomInput';
import { serverUrl } from '../../env/env';
import colors from '../../styles/colors';

const SignUpScreen = ({ onSubmit, isSignUp, setIsSignUp }) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    const onSubmitSignup = async () => {
        const city = " "
        if (email && password && firstName && lastName && phoneNumber && birthYear) {
            const form = {
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                birthYear,
                city
            }
            try {
                const user = (await axios.post(`${serverUrl}users`, { ...form })).data
                onSubmit(user, user.token)
            } catch (e) {
                Alert.alert("שגיאה!", "נא למלא את כל השדות נכונה", [{ text: "OK" }])
            }

        } else {
            Alert.alert("שגיאה!", "נא למלא את כל השדות נכונה", [{ text: "OK" }])
        }
    }

    const onSubmitLogin = async () => {
        try {
            const user = (await axios.post(`${serverUrl}users/login`, { email, password })).data
            onSubmit(user, user.token)
        } catch (e) {
            Alert.alert("שגיאה!", "שם משתמש או סיסמא לא נכונים", [{ text: "OK" }])
        }

    }

    const onPressLoginBtn = async () => {
        if (isSignUp)
            setIsSignUp(false)
        else
            await onSubmitLogin()

    }

    const onPressSignUpBtn = async () => {
        if (!isSignUp)
            setIsSignUp(true)
        else
            await onSubmitSignup()
    }



    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.signupBtn} onPress={onPressSignUpBtn}>
                    <Text style={styles.signupBtnText}>
                        הירשם!
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupBtn} onPress={onPressLoginBtn}>
                    <Text style={styles.signupBtnText}>
                        התחבר!
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: colors.orange }}>{isSignUp ? "הרשמה" : "התחברות"}</Text>
                <>
                    {isSignUp ?
                        <View style={styles.form}>
                            <View>
                                <CustomInput placeholder="אימייל" style={styles.input} onChangeText={setEmail} value={email} keyboardType="email-address" />
                                <CustomInput placeholder="סיסמא" style={styles.input} onChangeText={setPassword} value={password} name="password" />
                                <CustomInput placeholder="מספר טלפון" style={styles.input} onChangeText={setPhoneNumber} value={phoneNumber} keyboardType="numeric" />
                            </View>
                            <View>
                                <CustomInput placeholder="שנת לידה" style={styles.input} onChangeText={setBirthYear} value={birthYear} keyboardType="numeric" />
                                <CustomInput placeholder="שם פרטי" style={styles.input} onChangeText={setFirstName} value={firstName} />
                                <CustomInput placeholder="שם משפחה" style={styles.input} onChangeText={setLastName} value={lastName} />
                            </View>
                        </View>
                        : <>
                            <CustomInput placeholder="אימייל" style={{ width: '80%', marginTop: 40 }} onChangeText={setEmail} value={email} keyboardType="email-address" />
                            <CustomInput placeholder="סיסמא" style={{ width: '80%', marginTop: 40 }} onChangeText={setPassword} value={password} name="password" />
                        </>}
                </>



            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    form: {
        justifyContent: 'center',
        flexDirection: 'row-reverse',
    },
    input: {
        width: 120,
        margin: 5
    },
    signupBtn: {
        backgroundColor: 'white',
        padding: 10,
    },
    signupBtnText: {
        fontSize: 18,
        color: colors.orange,
        marginTop: 40
    }

})

export default SignUpScreen;