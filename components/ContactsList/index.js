import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableHighlight, StatusBar } from 'react-native';
import { Contacts, LinearGradient } from 'expo';


export default class ContactsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contacts: []
		}
	}

	static navigationOptions = {
    	title: 'NamierzOperatora',
    	headerTintColor: '#fff',
    	headerBackground: <LinearGradient style={{flex: 1}} colors={['#FF9D6B', '#FF84AD']} start={[0, 0]} end={[1, 0]}></LinearGradient>
  	};

	async componentDidMount() {
		const { data } = await Contacts.getContactsAsync();

		let contactsList = [];
		data.forEach(contact => {
			if(contact.phoneNumbers != undefined)
				contactsList.push({'name': contact.name, 'phone': contact.phoneNumbers[0].number})
		});
		this.setState({contacts: contactsList});
	}

	render() {

		return (
			<View>
			<StatusBar barStyle='light-content' /> 
				<FlatList
					style={styles.container}
					data={this.state.contacts}
					renderItem={({item}) =>
						<TouchableHighlight style={styles.contact} onPress={() => {
							console.log(item.phone);
						}}>
							<View style={styles.contactContainer}>
								<Text style={styles.name}>{item.name}</Text>
								<Text style={styles.phone}>{item.phone}</Text>
							</View>
						</TouchableHighlight>
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%'
	},

	contact: {
		width: '100%',
		height: 72,
		alignItems: 'center'
	},

	contactContainer: {
		width: 300,
		borderBottomColor: '#D9D9D9',
		borderBottomWidth: 1,
		height: '100%',
		justifyContent: 'center'
	},

	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#4B4B4B'
	},

	phone: {
		color: '#D9D9D9',
		fontSize: 15,
		fontWeight: '600'
	}
});

