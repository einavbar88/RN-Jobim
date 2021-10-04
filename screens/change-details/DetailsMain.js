import React, { useContext } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import InfoRow from '../../components/InfoRow';
import { UsersContext } from '../../context/UsersContext';

const windowWidth = Dimensions.get('window').width;

const DetailsMain = ({ navigation, route }) => {

    const { user } = useContext(UsersContext)

    return (
        <View style={styles.screen}>
            <View style={styles.avatar}>
                <Image style={{ width: 100, height: 100 }} source={require("../../icons/btn_picture_normal.png")} />
            </View>
            <InfoRow img={require("../../icons/icon_signup_name.png")} text={`${user?.user?.firstName} ${user?.user?.lastName}`} row="name" navigation={navigation} />
            <InfoRow img={require("../../icons/icon_signup_city.png")} text={`${user?.user?.city}`} row="city" navigation={navigation} />
            <InfoRow img={require("../../icons/icon_signup_year.png")} text={`${user?.user?.birthYear}`} row="birthYear" navigation={navigation} />
            <InfoRow img={require("../../icons/icon_signup_email.png")} text={`${user?.user?.email}`} row="email" navigation={navigation} />
            <View style={styles.imgContainer}>
                <Image source={require("../../icons/bkg_newjob_1.png")} style={{ width: windowWidth - 150, height: 150 }} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'space-between',
        flex: 1
    },
    imgContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },

})

export default DetailsMain;