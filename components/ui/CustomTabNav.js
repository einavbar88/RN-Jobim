import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import colors from '../../styles/colors';

const CustomTabNav = ({ state, descriptors, navigation, position, width }) => {


    return (
        <View style={styles.tabNavBtnsContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

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

                const tabNavBtnStyle = {
                    ...styles.tabNavBtn,
                    backgroundColor: isFocused ? colors.orange : "transparent",
                    borderTopLeftRadius: !width ? (index === 1 ? 0 : 8) : (index === 1 ? 0 : (index < 2 ? 5 : 0)),
                    borderBottomLeftRadius: !width ? (index === 1 ? 0 : 8) : (index === 1 ? 0 : (index < 2 ? 5 : 0)),
                    borderTopRightRadius: !width ? (index === 1 ? 8 : 0) : (index === 1 ? 0 : (index === 0 ? 0 : 5)),
                    borderBottomRightRadius: !width ? (index === 1 ? 8 : 0) : (index === 1 ? 0 : (index === 0 ? 0 : 5)),
                    width: width ? `${width}%` : "45%",
                    paddingVertical: width ? 5 : 10,

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
                        <Text style={{ color: isFocused ? "white" : colors.orange, fontWeight: isFocused ? '700' : '500', fontSize: 16, textAlign: 'center' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabNavBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    tabNavBtn: {
        borderWidth: 1,
        borderColor: colors.orange
    },

});

export default CustomTabNav