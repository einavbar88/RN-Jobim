import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MainPagePosts from "./MainPagePosts";

const PostModal = ({ data }) => {

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        return () => {
            setModalVisible(false)
        }
    }, [])

    return (
        modalVisible ?
            <>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}

                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.header}>
                        <TouchableOpacity activeOpacity={1} style={styles.btnContainer} onPress={() => setModalVisible(!modalVisible)}>
                            <Image source={require("../../icons/btn_close_popup.png")} style={styles.btnImg} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={{ ...styles.btnContainer, width: 5, height: 20 }}>
                            <Image source={require("../../icons/btn_more_normal.png")} style={styles.btnImg} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <MainPagePosts data={data} isPostPage={true} />
                    </ScrollView>
                </Modal>

            </> :
            <MainPagePosts data={data} onPress={() => setModalVisible(true)} />
    )

}

const styles = StyleSheet.create({

    header: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginTop: 8,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10000,
        top: 10
    },
    btnContainer: {
        width: 20,
        height: 25
    },
    btnImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        tintColor: 'white'
    }

});


export default PostModal