import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/ui/CustomInput';
import { PostsContext } from '../../context/PostsContext';
import colors from '../../styles/colors';

const windowWidth = Dimensions.get('window').width;

const CompanyDetails = () => {

    const { newPostDetails, dispatchNewPostDetails } = useContext(PostsContext)

    const onChangeName = (name) => {
        dispatchNewPostDetails({ type: "COMPANY_NAME", name })
    }
    const onChangeBranch = (branch) => {
        dispatchNewPostDetails({ type: "BRANCH", branch })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.topText}>
                    אנא מלאו את הפרטים הבאים כדי ליצור ג'וב חדש
                </Text>
                <View style={styles.inputSectionContainer}>
                    <CustomInput value={newPostDetails.name.name} onChangeText={onChangeName} placeholder="שם החברה" style={styles.input} />
                    <CustomInput value={newPostDetails.name.branch} onChangeText={onChangeBranch} placeholder="שם הסניף (לא חובה)" style={styles.input} />
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
        marginVertical: 10,
        textAlign: 'center'
    },
    inputSectionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 25,
        width: windowWidth,
    },
    input: {
        width: '80%',
        alignItems: 'flex-end',
        color: colors.orange
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


export default CompanyDetails;