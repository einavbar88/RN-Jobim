import React, { useEffect, useReducer, useState } from 'react';
import { getCurrentLocation } from '../auxFunc';
import FiltersReducer, { filtersInitialState } from '../reducers/FiltersReducer';
import NewPostReducer, { initialState } from '../reducers/NewPostReducer';


export const PostsContext = React.createContext()

const PostsProvider = (props) => {

    // const [,] = useState(null)
    const [newPostDetails, dispatchNewPostDetails] = useReducer(NewPostReducer, {
        ...initialState,
        name: { ...initialState.name },
        description: { ...initialState.description },
        location: { ...initialState.location }
    })

    const [filters, dispatchFilters] = useReducer(FiltersReducer, filtersInitialState)

    const [phoneLocation, setPhoneLocation] = useState(null);
    const [location, setLocation] = useState({})
    const [jobsList, setJobsList] = useState([])



    useEffect(() => {
        getCurrentLocation(setPhoneLocation);
    }, [])

    useEffect(() => {
        if (phoneLocation) {
            const { longitude, latitude } = phoneLocation.coords
            setLocation({ lat: latitude, lng: longitude })
        }
    }, [phoneLocation])

    return (
        <PostsContext.Provider
            value={{
                newPostDetails, dispatchNewPostDetails,
                location, jobsList, setJobsList,
                filters, dispatchFilters
            }}
        >
            {props.children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;