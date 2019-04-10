import React from 'react';
import ContactsList from './components/ContactsList';
import NumberInfo from './components/NumberInfo';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppStackNavigator = createStackNavigator({
	ContactsList: {
		screen: ContactsList,
		options: {
			headerLayoutPreset: 'center',
		},
		navigationOptions: {
			headerBackTitle: 'Cofnij',
		}
	},

	NumberInfo: {
		screen: NumberInfo,
		options: {
			headerLayoutPreset: 'center'
		}
	}
});

const App = createAppContainer(AppStackNavigator);
export default App;