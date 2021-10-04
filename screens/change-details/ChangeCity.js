import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomInput from '../../components/ui/CustomInput';
import { UsersContext } from '../../context/UsersContext';
import colors from '../../styles/colors';
import citiesArray from '../../data/citiesArray.json'
const windowWidth = Dimensions.get('window').width;

const ChangeCity = () => {


    const { user, dipatchUserChanges } = useContext(UsersContext)

    const [city, setCity] = useState(user.user.city)
    const [suggested, setSuggested] = useState([])


    const chooseSuggested = (chosen) => {
        setCity(chosen)
        setSuggested([])
        dipatchUserChanges({ type: "CHANGE_CITY", city: chosen })
    }

    useEffect(() => {
        return () => {
            dipatchUserChanges({ type: "RESET" })
        }
    }, [])

    useEffect(() => {
        if (!citiesArray.find((c) => c === city)) {
            dipatchUserChanges({ type: "CHANGE_CITY", city: '' })
            setSuggested(citiesArray.filter((c) => c.includes(city)).slice(0, 5))
        }
    }, [city])

    return (
        <View style={styles.screen}>
            <View>
                <Text style={styles.topText}>עיר המגורים שלך</Text>
                <CustomInput
                    placeholder="עיר מגורים"
                    value={city}
                    onChangeText={setCity}
                    style={styles.input}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.deleteBtn} onPress={() => setCity('')}>
                        <Text style={styles.deleteBtnText}>
                            X
                        </Text>
                    </TouchableOpacity>
                </CustomInput>
                <View>
                    {city.length > 2 && suggested !== [] && suggested.map((address) => (
                        <TouchableOpacity key={address} activeOpacity={1} style={styles.suggested} onPress={() => chooseSuggested(address)}>
                            <Text style={{ textAlign: 'right', paddingRight: 50, color: colors.orange }}>{address}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
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
        flex: 1
    },
    topText: {
        textAlign: 'center',
        marginVertical: 30
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    deleteBtn: {
        position: 'absolute',
        right: 20,
        top: 17,
        backgroundColor: colors.orange,
        borderRadius: 30
    },
    input: {
        width: windowWidth - 40,
        alignItems: 'flex-end',
        position: 'relative'
    },
    deleteBtnText: {
        marginHorizontal: 7,
        marginVertical: 3,
        color: 'white'
    },
    suggested: {

    }
});

export default ChangeCity;