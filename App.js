import React from 'react';
import ContactsList from './components/ContactsList';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';

const AppStackNavigator = createStackNavigator({
	ContactsList: {
		screen: ContactsList
	}
});

const App = createAppContainer(AppStackNavigator);
export default App;