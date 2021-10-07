import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import Loading from './components/Loading';
import PostsProvider from './context/PostsContext';
import UsersProvider from './context/UsersContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <UsersProvider>
      <PostsProvider>
        <View style={{ paddingTop: Platform.OS === "android" && !Platform.constants.Model.includes('SM') ? StatusBar.currentHeight : 0, flex: 1 }}>
          <AppNavigator />
          <Loading />
        </View>
      </PostsProvider>
    </UsersProvider>
  );
}
