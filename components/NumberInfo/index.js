import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Contacts } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const smallFont = 15;
const sidePadding = 15;

export default class NumberInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			operatorCode: '',
			operatorName: ''
		}
	}

	static navigationOptions = {
    	headerTintColor: '#fff'
  	};

  	componentDidMount() {
  		const { params = {} } = this.props.navigation.state;

  		fetch('http://download.t-mobile.pl/updir/updir.cgi?msisdn=' + params.phone)
  		.then(resp => {
  			try {
	  			resp = resp._bodyInit;
	  			let operatorCode = resp.split('Kod sieci:</b></td><td>')[1].split('</td><tr><td><b>Operator:</b></td><td>')[0];
	  			let operatorName = resp.split('Operator:</b></td><td>')[1].split('</td>')[0];

	  			this.setState({
	  				contactName: params.name,
	  				contactPhone: params.phone,
	  				operatorCode: operatorCode,
	  				operatorName: operatorName.toUpperCase(),
	  				isLoading: false
	  			});

	  		} catch (err) {
	  			Alert.alert(
					'Wykorzystano limit zapytań! Odczekaj kilka minut i spróbuj ponownie.',
					'',
					[ {text: 'OK', onPress: () => this.props.navigation.goBack()}, ],
					{ cancelable: false }
				);
	  		}
  		});
  	}

	render() {
		if(this.state.isLoading) {
			return (
				<View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator size="large" color="#D94336" />
				</View>);
		} else {
			return(
				<View>
					<View style={{paddingLeft: sidePadding, paddingRight: sidePadding, height: '100%'}}>
						<Text style={{fontSize: smallFont - 2, color: '#A5A5A5', marginBottom: 63, fontWeight: '500', marginTop: '20%'}}>PROFIL KONTAKTU</Text>

						<View style={styles.contactInfo}>
							<Text style={styles.contactName}>{this.state.contactName}</Text>
							<Text style={styles.contactNumber}>{this.state.contactPhone}</Text>
						</View>

						<View>
							<View style={styles.infoContainer}>
								<Text style={styles.infoLabel}>KRAJ:</Text>
								<Text style={styles.infoData}>POLSKA</Text>
							</View>
							<View style={styles.infoContainer}>
								<Text style={styles.infoLabel}>KOD OPERATORA:</Text>
								<Text style={styles.infoData}>{this.state.operatorCode}</Text>
							</View>
							<View style={styles.infoContainer}>
								<Text style={styles.infoLabel}>OPERATOR:</Text>
								<Text style={styles.infoData}>{this.state.operatorName}</Text>
							</View>
						</View>
					</View>

					<View style={styles.bottomBar}>
						<TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
							<Ionicons name='ios-call' color='#E03434' size={35} />
							<Text style={{fontSize: 10, color: '#E03434'}}>ZADZWOŃ</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	contactInfo: {
		marginBottom: 63
	},

	contactName: {
		marginBottom: 17,
		fontSize: 36,
		fontWeight: '500'
	},

	contactNumber: {
		fontSize: 20,
		color: '#A5A5A5',
		fontWeight: '500'
	},

	infoContainer: {
		flexDirection: 'row'
	},

	infoLabel: {
		fontSize: smallFont,
		marginBottom: 15,
		color: '#A5A5A5',
		fontWeight: '500'
	},

	infoData: {
		marginLeft: 3,
		color: '#E03434',
		fontSize: smallFont,
		fontWeight: '500'
	},

	bottomBar: {
		position: 'absolute',
		justifyContent: 'center',
		bottom: 0,
		width: '100%',
		height: 89,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 6.68,

		elevation: 11
	}
});