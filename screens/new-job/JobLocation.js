import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Button } from 'react-native';
import { PostsContext } from '../../context/PostsContext';
import { searchAutoComplete } from '../../auxFunc'
import colors from '../../styles/colors';

const JobLocation = ({ navigation }) => {

    const { newPostDetails, dispatchNewPostDetails } = useContext(PostsContext)

    const [options, setOptions] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [locationText, setLocationText] = useState('')
    const [buildingNum, setBuildingNum] = useState('')
    const [addressText, setAddressText] = useState({ city: '', street: '', number: '' })

    const onPressLocation = (address) => {
        setModalOpen(true)
        setLocationText(`${address[0]} ${address[1]}`)
        setAddressText({ city: address[0], street: address[1], number: '' })
    }

    const onPressBuildingNumber = () => {
        if (buildingNum !== '') {
            setModalOpen(false)
            const address = `${locationText} ${buildingNum}`
            setLocationText(address)
            addressText.number = buildingNum
            dispatchNewPostDetails({ type: "JOB_LOCATION", location: address, locationValid: true, locationArr: options[0].concat(buildingNum), addressText })
            setBuildingNum('')
        }
    }

    useEffect(() => {
        if (locationText !== newPostDetails.location)
            dispatchNewPostDetails({ type: "JOB_LOCATION", locationValid: false })

        if (locationText.length > 2) {
            searchAutoComplete(locationText)
                .then((res) => setOptions(res))
        }
        else if (options !== [])
            setOptions([])
    }, [locationText])


    useEffect(() => {
        if (newPostDetails.locationValid)
            navigation.navigate('attachment')
    }, [newPostDetails])

    return (
        <View style={styles.container}>
            <Modal
                visible={modalOpen}
                onRequestClose={() => {
                    setModalOpen(false)
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <TextInput keyboardType='numeric' placeholder="מספר בניין" value={buildingNum} onChangeText={setBuildingNum} />
                    <Button title="אישור" onPress={onPressBuildingNumber} />
                </View>
            </Modal>
            <Text style={styles.topText}>
                מיקום הג'וב
            </Text>
            <View style={{ width: '100%', height: 1, backgroundColor: 'black' }} />
            <View style={styles.input}>
                <View style={styles.iconContainer}>
                    <Image source={require("../../icons/icon_search_selected.png")} style={styles.img} />
                </View>
                <TextInput placeholder="חפש כתובת" textAlign={"left"} style={styles.textInput} value={locationText} onChangeText={setLocationText} />
            </View>
            {
                newPostDetails.locationValid &&
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start', width: '80%' }}>
                    <Image source={require('../../icons/abc_btn_radio_to_on_mtrl_015.png')} style={{ tintColor: colors.orange, height: 25, width: 25 }} />
                    <Text style={{ color: colors.orange }}>{newPostDetails.location}</Text>
                </View>
            }

            <View style={{ alignItems: 'flex-end', width: '80%' }}>
                {options.length > 0 && options.map((address) => <TouchableOpacity activeOpacity={1} key={address} onPress={() => onPressLocation(address)}>
                    <Text style={{ color: colors.orange }}>{address[0]} {address[1]}</Text>
                </TouchableOpacity>)}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    topText: {
        marginVertical: 10,
        textAlign: 'center'
    },
    textInput: {
        paddingLeft: 10,
    },
    iconContainer: {
        width: 18,
        height: 18,
        margin: 5
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 3,
        borderRadius: 8,
        width: '95%',
        marginVertical: 10

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
});


export default JobLocation;