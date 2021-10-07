import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import { getCurrentLocation } from '../../../auxFunc';
import { PostsContext } from '../../../context/PostsContext';

const LocationFilter = () => {

    const { currentFilters, dispatchFilters } = useContext(PostsContext)
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (currentFilters.locationArea.lat)
            setLocation({
                coords: {
                    latitude: currentFilters.locationArea.lat,
                    longitude: currentFilters.locationArea.lng,
                }
            })
        else
            getCurrentLocation(setLocation);
        return () => {
            setLocation(null)
        }
    }, []);

    useEffect(() => {
        dispatchFilters({ type: "LOCATION", locationArea: location })
    }, [location])

    return (
        location &&
        <View style={{ paddingVertical: 20, backgroundColor: 'white', alignItems: 'center' }}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={(e) => {
                    const newCoords = e.nativeEvent.coordinate
                    setLocation({
                        coords: {
                            latitude: newCoords.latitude,
                            longitude: newCoords.longitude
                        }
                    })
                }}
            >
                <Marker
                    coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height - 120,
        width: Dimensions.get('window').width - 10
    }
})
export default LocationFilter;