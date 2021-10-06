import React, { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { parseJob } from '../../../auxFunc';
import { PostsContext } from '../../../context/PostsContext';
import jobs from '../../../data/jobs';
import JobFilterListItem from './JobFilterListItem';

export const jobsArray = Object.values(jobs)

const JobFilter = () => {

    const { filters, dispatchFilters } = useContext(PostsContext)
    const [searchFilter, setSearchFilter] = useState('')


    const onPressJob = (jobType) => {
        dispatchFilters({ type: "JOB_TYPE", jobType })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <View style={styles.iconContainer}>
                        <Image source={require("../../../icons/icon_search_selected.png")} style={styles.img} />
                    </View>
                    <TextInput placeholder="מצא ג'וב" textAlign={"left"} style={styles.textInput} value={searchFilter} onChangeText={setSearchFilter} />
                </View>
            </View>
            <ScrollView>
                {jobsArray.filter(job => job.name.includes(searchFilter.trim())).map((job, i) => <JobFilterListItem data={job} key={i} onPress={onPressJob} state={filters.jobsTypes.find((j) => jobs[j].name === job.name)} />)}
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

