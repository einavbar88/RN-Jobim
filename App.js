import React from 'react';
import { Platform, StatusBar } from 'react-native';
import PostsProvider from './context/PostsContext';
import UsersProvider from './context/UsersContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {

  return (
    <UsersProvider style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }} >
      <PostsProvider>
        <AppNavigator />
      </PostsProvider>
    </UsersProvider>
  );
}
