import React, { useContext, useState } from "react"
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PostsContext } from "../../../context/PostsContext";
import colors from '../../../styles/colors';
import FiltersModal from "./FiltersModal";


const FiltersBtn = () => {

    const { dispatchFilters } = useContext(PostsContext)

    const [modalVisible, setModalVisible] = useState(false);

    const close = () => setModalVisible(false)

    const cancel = () => {
        dispatchFilters({ type: "RESET" })
        close()
    }

    const applyFilters = () => {
        close()
    }

    return (
        <>
            <TouchableOpacity activeOpacity={1} style={styles.filtersBtn} onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.btnIcons}>
                    <Image source={require("../../../icons/icon_filter_black.png")} style={styles.btnIconsImg} />
                </View>
                <Text style={{ fontWeight: '700', color: colors.orange }}>מציג את כל  הג'ובים סביבי</Text>
                <View style={{ ...styles.btnIcons, height: 9 }}>
                    <Image source={require("../../../icons/arrow_down_pressed.png")} style={styles.btnIconsImg} />
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                style={{ backgroundColor: 'black' }}
                onRequestClose={cancel}
            >
                <FiltersModal close={cancel} confirm={applyFilters} />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    filtersBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8,
        borderColor: colors.orange,
        borderWidth: 1,
        padding: 5
    },
    btnIcons: {
        width: 13,
        height: 13
    },
    btnIconsImg: {
        tintColor: colors.orange,
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
});

export default FiltersBtn