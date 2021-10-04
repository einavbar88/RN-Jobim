import React from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import jobs from '../../../data/jobs';
import JobFilterListItem from './JobFilterListItem';

export const jobsArray = Object.values(jobs)


const JobFilter = () => {

    const onPressJob = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <View style={styles.iconContainer}>
                        <Image source={require("../../../icons/icon_search_selected.png")} style={styles.img} />
                    </View>
                    <TextInput placeholder="מצא ג'וב" textAlign={"left"} style={styles.textInput} />
                </View>
            </View>
            <ScrollView>
                {jobsArray.map((job, i) => <JobFilterListItem data={job} key={i} onPress={onPressJob} state={''} />)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        backgroundColor: 'white',
        marginBottom: 25
    },
    inputContainer: {
        padding: 8,
        backgroundColor: 'rgb(233, 233, 233)'
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 3,
        borderRadius: 8
    },
    iconContainer: {
        width: 18,
        height: 18,
        margin: 5
    },
    textInput: {
        paddingLeft: 10,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        tintColor: '#bbb'
    },
});

export default JobFilter;

