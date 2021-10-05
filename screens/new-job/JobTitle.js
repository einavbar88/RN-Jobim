import React, { useContext } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { jobsArray } from '../../components/posts/filters/JobFilter';
import JobFilterListItem from '../../components/posts/filters/JobFilterListItem';
import { PostsContext } from '../../context/PostsContext';
import jobs from '../../data/jobs';
import colors from '../../styles/colors';

const windowWidth = Dimensions.get('window').width;

const JobTitle = ({ navigation }) => {

    const { newPostDetails, dispatchNewPostDetails } = useContext(PostsContext)

    const parseJob = (jobName) => {
        for (let [key, value] of Object.entries(object1))
            if (value.name === jobName)
                return key
    }

    const onPressJob = (jobName) => {
        const job = parseJob(jobName)
        dispatchNewPostDetails({ type: "JOB_NAME", job })
        navigation.navigate('description')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>
                אנא בחרו את הג'וב שלכם
            </Text>
            <View style={{ width: '100%', height: 1, backgroundColor: 'black' }} />
            <ScrollView style={{ width: '100%' }}>
                {jobsArray.map((job, i) => <JobFilterListItem data={job} key={i} shape="circle" onPress={onPressJob} state={newPostDetails.job === job.name} />)}
            </ScrollView>
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
        alignItems: 'flex-start',
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


export default JobTitle;