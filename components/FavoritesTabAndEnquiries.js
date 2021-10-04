import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

const FavoritesTabAndEnquiries = ({ route }) => {

    const text = route.name === 'מועדפים' ?
        "אין לך עדיין ג'ובים מועדפים" :
        "עדיין לא פנית לאף ג'וב...          צור קשר עם מעסיק עוד היום!"

    return (
        <View style={styles.container}>
            <Text style={styles.emptyText}>{text}</Text>
            <View style={styles.emptyImage}>
                <Image source={require("../icons/icon_menu_feed.png")} tintColor={colors.orange} style={styles.image} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: colors.orange,
        maxWidth: '50%',
        textAlign: 'center'
    },
    emptyImage: {
        height: 80,
        width: 70,
        marginTop: 20
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
});

export default FavoritesTabAndEnquiries