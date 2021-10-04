import axios from "axios";
import * as Location from 'expo-location';
import { geocodeAPIUrl, googleAPIKey } from "./env/env";

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

export const getCoordinates = async (address, setCoordinates) => {
    const { city, street, number } = address
    axios.get(`${geocodeAPIUrl}address=${street} ${number} ${city}&key=${googleAPIKey}`)
        .then((res) => {
            if (res.data.results[0]) {
                const { lng, lat } = res.data.results[0].geometry.location
                setCoordinates([lat, lng])
            }
        })
        .catch((e) => console.log(e))
}
