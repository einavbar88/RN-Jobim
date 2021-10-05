import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { UsersContext } from '../context/UsersContext';
import { serverUrl } from '../env/env';
import colors from '../styles/colors';
import PostModal from './posts/PostModal';



const FavoritesTabAndEnquiries = ({ route }) => {

    const { user } = useContext(UsersContext)

    const [favorites, setFavorites] = useState([])

    const text = route.name === 'מועדפים' ?
        "אין לך עדיין ג'ובים מועדפים" :
        "עדיין לא פנית לאף ג'וב...          צור קשר עם מעסיק עוד היום!"

    const getFavorites = async () => {
        const favorites = await axios.get(`${serverUrl}jobs/favorites`, { params: { favoritesList: user.user.favorites } })
        console.log(user.user.favorites)
        setFavorites(favorites.data)
    }

    useEffect(() => {
        getFavorites()
    }, [user.user.favorites])

    return (
        <View style={styles.container}>
            {
                favorites.length > 0 ?
                    <FlatList
                        data={favorites}
                        keyExtractor={job => job._id}
                        renderItem={(job) => <PostModal data={job} />}
                    />
                    :
                    <>
                        <Text style={styles.emptyText}>{text}</Text>
                        <View style={styles.emptyImage}>
                            <Image source={require("../icons/icon_menu_feed.png")} tintColor={colors.orange} style={styles.image} />
                        </View>
                    </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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