import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableHighlight } from 'react-native';
import { Contacts } from 'expo';


export default class ContactsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contacts: []
		}
	}

	static navigationOptions = {
    	title: 'NamierzOperatora',
    	headerTintColor: '#fff'
  	};

	async componentDidMount() {
		const { data } = await Contacts.getContactsAsync();

		let contactsList = [];
		data.forEach(contact => {
			if(contact.phoneNumbers != undefined)
				contactsList.push({'name': contact.name, 'phone': contact.phoneNumbers.number})
		});
		this.setState({contacts: contactsList});
	}

	render() {

		return (
			<View>
				<FlatList
					data={this.state.contacts}
					renderItem={({item}) => 
						<TouchableHighlight>
							<Text>{item.name}</Text>
						</TouchableHighlight>
					}
				/>
			</View>
		);
	}
}