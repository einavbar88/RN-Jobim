import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import CustomInput from '../../components/ui/CustomInput';
import { UsersContext } from '../../context/UsersContext';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;

const ChangeName = () => {

    const { user, changeUser, dipatchUserChanges } = useContext(UsersContext)

    const [firstName, setFirstName] = useState(user.user.firstName)
    const [lastName, setLastName] = useState(user.user.lastName)
    const [image, setImage] = useState(null);
    const [imageSource, setImageSource] = useState(user.user.avatar)


    const pickImage = async () => {
        const getPermissions = await (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setImageSource(result.uri)
        }
    };

    useEffect(() => {
        dipatchUserChanges({ type: "CHANGE_FIRST_NAME", firstName })
    }, [firstName])

    useEffect(() => {
        dipatchUserChanges({ type: "CHANGE_LAST_NAME", lastName })
    }, [lastName])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.topText}>
                    אנא מלאו את הפרטים הבאים כדי ליצור קשר עם המעסיק
                </Text>
                <View style={styles.imgSectionContainer}>
                    <TouchableOpacity activeOpacity={1} onPress={pickImage}>
                        <View style={styles.imgContainer} >
                            {!image && !imageSource ?
                                <Image source={require("../../icons/btn_picture_normal.png")} style={styles.img} /> :
                                image ? <Image source={{ uri: image }} style={styles.img} /> :
                                    <Image source={{ uri: imageSource }} style={styles.img} />
                            }
                        </View>
                    </TouchableOpacity>
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
        height: 120,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        borderRadius: 500
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