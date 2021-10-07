import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import CustomInput from '../../components/ui/CustomInput';
import { PostsContext } from '../../context/PostsContext';
import jobs from '../../data/jobs';
import colors from '../../styles/colors';

const windowWidth = Dimensions.get('window').width;

const JobDescription = () => {

    const { newPostDetails, dispatchNewPostDetails } = useContext(PostsContext)

    const onChangeTitle = (title) => {
        dispatchNewPostDetails({ type: "DESCRIPTION_TITLE", title })
    }
    const onChangeDescription = (description) => {
        dispatchNewPostDetails({ type: "DESCRIPTION_DESCRIPTION", description })
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.topText}>
                    <Text> {`${newPostDetails.name.name} `}</Text>
                    <Text>מחפשת</Text>
                    <Text> {`${jobs[newPostDetails.job]?.name} `}</Text>
                </View>
                <View style={styles.inputSectionContainer}>
                    <CustomInput value={newPostDetails.description.title} onChangeText={onChangeTitle} placeholder="כותרת קולעת (עד 50 תווים)" style={styles.input} />
                    <CustomInput value={newPostDetails.description.description} onChangeText={onChangeDescription} placeholder="תנו תיאור קצר של הג'וב ב2/3 משפטים" style={{ ...styles.input, height: 120 }} />
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
        textAlign: 'center',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center'
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
        color: colors.orange,
        textAlign: 'left'
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


export default JobDescription;