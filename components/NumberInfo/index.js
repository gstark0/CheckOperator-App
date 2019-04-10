import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, StatusBar } from 'react-native';
import { Contacts, LinearGradient } from 'expo';

export default class NumberInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
    	headerTintColor: '#fff',
    	headerBackground: <LinearGradient style={{flex: 1}} colors={['#FF9D6B', '#FF84AD']} start={[0, 0]} end={[1, 0]}></LinearGradient>
  	};

	render() {
		return(
			<Text>works</Text>
		);
	}
}