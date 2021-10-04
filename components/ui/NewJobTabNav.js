import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { PostsContext } from '../../context/PostsContext';
import colors from '../../styles/colors';


const windowWidth = Dimensions.get('window').width;


const NewJobTabNav = ({ state, descriptors, navigation, position }) => {

    const { newPostDetails } = useContext(PostsContext)


    return (
        <View style={styles.tabNavBtnsContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                let img = require("../../icons/icon_signup_v.png")
                let isEmpty = false

                const isFocused = state.index === index;

                switch (route.name) {
                    case "name":
                        if (newPostDetails.name.name.trim() === '') {
                            img = require("../../icons/icon_newjob_name.png")
                            isEmpty = true
                        } else isEmpty = false

                        if (isFocused)
                            img = require("../../icons/icon_newjob_name.png")

                        break
                    case "job":
                        if (newPostDetails.job.trim() === '') {
                            img = require("../../icons/icon_newjob_job.png")
                            isEmpty = true
                        } else isEmpty = false

                        if (isFocused)
                            img = require("../../icons/icon_newjob_job.png")

                        break
                    case "description":
                        if (newPostDetails.description.title.trim() === '') {
                            img = require("../../icons/icon_newjob_description.png")
                            isEmpty = true
                        } else isEmpty = false

                        if (isFocused)
                            img = require("../../icons/icon_newjob_description.png")
                        break
                    case "location":
                        if (!newPostDetails.locationValid) {
                            img = require("../../icons/icon_signup_city.png")
                            isEmpty = true
                        } else isEmpty = false

                        if (isFocused)
                            img = require("../../icons/icon_signup_city.png")
                        break
                    case "attachment":
                        if (newPostDetails.attachment === '') {
                            img = require("../../icons/icon_newjob_extra.png")
                            isEmpty = true
                        } else isEmpty = false
                        if (isFocused)
                            img = require("../../icons/icon_newjob_extra.png")
                        break
                    default:
                        break
                }


                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const inputRange = state.routes.map((_, i) => i);
                //
                const tabNavBtnStyle = {
                    ...styles.tabNavBtn,
                    backgroundColor: isEmpty ? (isFocused ? colors.orange : colors.lightOrange) : colors.orange,
                    borderLeftWidth: route.name === 'name' ? 0 : 1
                }

                return (
                    <TouchableOpacity
                        activeOpacity={1}
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={tabNavBtnStyle}
                    >
                        <View style={{ height: 20, width: 20 }}>
                            <Image source={img} style={styles.image} />
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabNavBtnsContainer: {
        flexDirection: 'row',
        height: 50,
        width: windowWidth
    },
    tabNavBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'white'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    }
});

export default NewJobTabNav