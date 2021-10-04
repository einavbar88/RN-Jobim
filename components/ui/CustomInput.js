import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../../styles/colors';

const CustomInput = (props) => {

    const { placeholder, onChangeText, value, style, keyboardType = "default", name } = props

    const [focus, setFocus] = useState(false)

    return (
        <View style={{ ...styles.inputContainer, borderWidth: 1, borderColor: focus ? colors.orange : "transparent", ...style }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={name === 'password'}
            // onTouchStart={() => setFocus(true)}
            // onTouchCancel={() => setFocus(false)}
            />
            {props.children}
        </View>
    );
};


const styles = StyleSheet.create({
    inputContainer: {
        padding: 17,
        width: '40%',
        backgroundColor: '#ddd',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    input: {
        color: colors.orange
    }
})

export default CustomInput;