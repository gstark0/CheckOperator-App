import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Contacts, LinearGradient } from 'expo';
import { Permissions } from 'expo';


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
		this.setState({contacts: contactsList});
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View>
				<StatusBar barStyle='light-content' /> 
				<FlatList
					style={styles.container}
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
	container: {
		height: '100%',
	},

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

