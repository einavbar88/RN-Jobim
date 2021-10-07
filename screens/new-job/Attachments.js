import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { PostsContext } from '../../context/PostsContext';
import colors from '../../styles/colors';
import { pickImage } from '../../auxFunc';

const windowWidth = Dimensions.get('window').width;

const Attachments = () => {

    const { newPostDetails, dispatchNewPostDetails } = useContext(PostsContext)
    const [isChecked, setIsChecked] = useState(false)
    const [image, setImage] = useState(null);
    const [img64Source, setImg64Source] = useState(newPostDetails.attachment)



    const chooseImage = async () => {
        const { uri, img64 } = await pickImage()
        setImage(uri)
        setImg64Source(img64)
    };


    useEffect(() => {
        dispatchNewPostDetails({ type: "ATTACHMENT", attachment: img64Source })
    }, [img64Source])

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.topText}>
                    <Text>כמה פרטים אחרונים (לא חובה)</Text>
                </View>
                <View style={{ ...styles.body, justifyContent: 'space-evenly' }}>
                    <View>
                        <Text>
                            מומלץ לצרף תמונת אווירה הקשורה
                        </Text>
                        <Text>
                            לתפקיד או לבית העסק.
                        </Text>
                        <Text>
                            לא להעלות סתם לוגו...
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.attachment} activeOpacity={1} onPress={chooseImage}>
                        {image ? <Image source={{ uri: image }} style={styles.img} key="user-image" /> :
                            <Image source={require('../../icons/add_pic_normal.png')} style={{ ...styles.img, tintColor: 'black' }} />
                        }

                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.body} activeOpacity={1} onPress={() => setIsChecked(!isChecked)}>
                    <Text style={{ color: colors.orange }}>מתאים לבני נוער</Text>
                    {isChecked ?
                        <Image style={{ ...styles.icon, tintColor: colors.orange }} source={require('../../icons/btn_checkbox_checked.png')} /> :
                        <Image style={styles.icon} source={require('../../icons/btn_checkbox_normal.png')} />
                    }
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.addQuestions}>
                    <Text>הוספת שאלת סינון למועמדים</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: windowWidth - 100, height: 150 }}>
                <Image source={require("../../icons/bkg_newjob_1.png")} style={{ ...styles.img, tintColor: colors.orange }} />
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
    imgContainer: {
        width: 120,
        height: 120
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    body: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '88%',
        marginTop: 15

    },
    icon: {
        width: 20,
        height: 20,
        tintColor: 'gray',
        marginRight: 10,
    },
    attachment: {
        width: 80,
        height: 80
    },
    addQuestions: {
        width: windowWidth - 50,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: 'black'
    }
});


export default Attachments;