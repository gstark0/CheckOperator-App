import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Contacts, LinearGradient, Permissions } from 'expo';
import { Searchbar } from 'react-native-paper';


export default class ContactsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contacts: [],
			contactsBackup: []
		}
	}

	static navigationOptions = {
    	title: 'NamierzOperatora',
    	headerTintColor: '#fff'
  	};

	async componentDidMount() {
		const permission = await Permissions.askAsync(Permissions.CONTACTS);

		if (permission.status !== 'granted') {
			return;
		}

		const { data } = await Contacts.getContactsAsync();

		let contactsList = [];
		data.forEach(contact => {
			if(contact.phoneNumbers != undefined)
				contactsList.push({'name': contact.name, 'phone': contact.phoneNumbers[0].number})
		});
		this.setState({contacts: contactsList, contactsBackup: contactsList});
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={{flex: 1}}>
				<StatusBar barStyle='light-content' /> 
				<Searchbar placeholder='Szukaj kontaktu...' onChangeText={query => {


					filteredContacts = this.state.contactsBackup.filter(item => {
						return item.name.includes(query);
					});

					this.setState({
						contacts: filteredContacts
					})
				}}/>
				<FlatList
					contentContainerStyle={{ flexGrow: 1 }}
					data={this.state.contacts}
					renderItem={({item}) =>
						<TouchableOpacity style={styles.contact} onPress={() => navigate('NumberInfo', {name: item.name, phone: item.phone})}>
							<View style={styles.contactContainer}>
								<Text style={styles.name}>{item.name}</Text>
								<Text style={styles.phone}>{item.phone}</Text>
							</View>
						</TouchableOpacity>
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contact: {
		height: 87,
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15
	},

	contactContainer: {
		width: '100%',
		borderBottomColor: '#D6D6D6',
		borderBottomWidth: 1,
		height: '100%',
		justifyContent: 'center'
	},

	name: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#4B4B4B'
	},

	phone: {
		color: '#A5A5A5',
		fontSize: 13,
		fontWeight: '600'
	}
});

