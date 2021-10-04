import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/ui/CustomInput';
import { UsersContext } from '../../context/UsersContext';

const windowWidth = Dimensions.get('window').width;

const ChangeName = () => {

    const { user, changeUser, dipatchUserChanges } = useContext(UsersContext)

    const [firstName, setFirstName] = useState(user.user.firstName)
    const [lastName, setLastName] = useState(user.user.lastName)

    useEffect(() => {
        dipatchUserChanges({ type: "CHANGE_FIRST_NAME", firstName })
    }, [firstName])

    useEffect(() => {
        dipatchUserChanges({ type: "CHANGE_LAST_NAME", lastName })
    }, [lastName])

    useEffect(() => {
        return () => {
            dipatchUserChanges({ type: "RESET" })
        }
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.topText}>
                    אנא מלאו את הפרטים הבאים כדי ליצור קשר עם המעסיק
                </Text>
                <View style={styles.imgSectionContainer}>
                    <View style={styles.imgContainer}>
                        <Image source={require("../../icons/btn_picture_normal.png")} style={styles.img} />
                    </View>
                    <Text style={{ textAlign: 'center' }}>
                        הסלפי שלי
                    </Text>
                </View>
                <View style={styles.inputSectionContainer}>
                    <CustomInput value={firstName} onChangeText={setFirstName} />
                    <CustomInput value={lastName} onChangeText={setLastName} />
                </View>
            </View>
            <View style={{ width: windowWidth - 100, height: 150 }}>
                <Image source={require("../../icons/bkg_newjob_1.png")} style={styles.img} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    topText: {
        marginVertical: 20,
        textAlign: 'center'
    },
    imgSectionContainer: {
        alignItems: 'center'
    },
    imgContainer: {
        width: 120,
        height: 120
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    inputSectionContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 25,
        width: windowWidth,
    },

});


export default ChangeName;