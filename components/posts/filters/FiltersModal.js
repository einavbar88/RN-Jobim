import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../styles/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabNav from '../../ui/CustomTabNav';
import JobFilter from './JobFilter';
import LocationFilter from './LocationFilter';

const FiltersModal = ({ close }) => {

    const Tab = createMaterialTopTabNavigator();

    return (
        <>
            <View style={styles.modalHeader}>
                <View style={styles.modalHeaderTop}>
                    <TouchableOpacity activeOpacity={1}>
                        <Text style={styles.headerBtn}>אשר</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>הצג לפי</Text>
                    <TouchableOpacity activeOpacity={1} onPress={close}>
                        <Text style={styles.headerBtn}>בטל</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Tab.Navigator
                tabBar={props => <CustomTabNav {...props} width={30} />}
            >
                <Tab.Screen name="ג'וב" component={(JobFilter)} />
                <Tab.Screen name="מיקום" component={LocationFilter} />
                <Tab.Screen name="חברה" component={View} />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    modalHeader: {

    },
    modalHeaderTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    headerTitle: {
        color: colors.orange,
        fontSize: 20,
    },
    headerBtn: {
        color: colors.orange,
        fontSize: 14,
        fontWeight: '700'
    }
});

export default FiltersModal