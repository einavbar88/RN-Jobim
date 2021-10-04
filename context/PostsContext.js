import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { serverUrl } from '../env/env';
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


    return (
        <PostsContext.Provider
            value={{
                newPostDetails, dispatchNewPostDetails
            }}
        >
            {props.children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;