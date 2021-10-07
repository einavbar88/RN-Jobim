import axios from "axios";
import * as Location from 'expo-location';
import jobs from "./data/jobs";
import { geocodeAPIUrl, googleAPIKey, serverUrl } from "./env/env";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


const addressesAPIurl = "https://data.gov.il/api/3/action/datastore_search";

export const searchAutoComplete = async (value) => {
    try {
        const res = await axios.get(addressesAPIurl, {
            params: {
                resource_id: "9ad3862c-8391-4b2f-84a4-2d4c68625f4b",
                q: value,
                limit: 5,
            },
        });
        const records = res.data.result.records;
        const resultArray = [];
        for (let record of records) {
            resultArray.push([record["שם_ישוב"], record["שם_רחוב"]]);
        }

        return resultArray;
    } catch (err) {
        console.log(err.response.data.message);
    }
};

export default searchAutoComplete

export const parseJob = (jobName) => {
    for (let [key, value] of Object.entries(jobs))
        if (value.name === jobName)
            return key
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}


export const getCurrentLocation = async (setLocation) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    let location = await Location.getCurrentPositionAsync({});

    return setLocation(location);
}

export const getCoordinates = async (address, setCoordinates, post) => {
    const { city, street, number } = address
    try {
        const res = await axios.get(`${geocodeAPIUrl}address=${street} ${number} ${city}&key=${googleAPIKey}`)
        if (res.data.results[0]) {
            const { lng, lat } = res.data.results[0].geometry.location
            if (post)
                return [lat, lng]
            setCoordinates([lat, lng])
        }
    } catch (e) {
        console.log(e)
    }

}

export const pickImage = async () => {
    const getPermissions = await (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    })();
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    if (!result.cancelled) {
        const img64 = (await ImageManipulator.manipulateAsync(result.uri, [], { base64: true })).base64
        return { uri: result.uri, img64 }
    }
};

export const upload = async (img) => {
    if (img) {
        let base64Img = `data:image/jpg;base64,${img}`;
        let apiUrl =
            'https://api.cloudinary.com/v1_1/dxgdhmrw7/image/upload';
        let data = {
            file: base64Img,
            upload_preset: 'jobim-app'
        };

        let ret

        await fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then(async response => {
                let data = await response.json();
                if (data.secure_url) {
                    ret = data.url
                }
            })
            .catch(err => {
                alert('Cannot upload');
            });

        return ret
    }

};


export const saveNewPost = async (newPostDetails, storageToken) => {

    const { locationArr, attachment } = newPostDetails
    let att = ''
    if (attachment !== '')
        att = await upload(attachment)

    const coords = await getCoordinates({ city: locationArr[0], street: locationArr[1], number: locationArr[2] }, () => { }, true)

    const newPost = await axios.post(`${serverUrl}jobs`, { ...newPostDetails, coords, attachment: att }, {
        headers: {
            "Authorization": `Bearer ${storageToken}`
        }
    })
    return newPost

}

export const areJobsListsEqual = (list1, list2) => {
    if (list1.length !== list2.length)
        return false
    for (let i = 0; i < list1.length; i++) {
        if (list1[i]._id !== list2[i]._id)
            return false
    }
    return true
}