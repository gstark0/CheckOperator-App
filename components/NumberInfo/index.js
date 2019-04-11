import React from 'react';
import { StyleSheet, Image, View, Text, TouchableHighlight, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Contacts, LinearGradient } from 'expo';

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
    	headerTintColor: '#fff',
    	headerBackground: <LinearGradient style={{flex: 1}} colors={['#FF9D6B', '#FF84AD']} start={[0, 0]} end={[1, 0]}></LinearGradient>
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
	  				operatorName: operatorName,
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
					<View style={styles.contactInfo}>
						<Text style={styles.contactName}>{this.state.contactName}</Text>
						<Text style={styles.contactNumber}>{this.state.contactPhone}</Text>
					</View>

					<View style={styles.operatorInfo}>
						<View style={{ marginRight: 40, alignItems: 'center',  }}>
							<Text style={styles.operatorInfoLabel}>Operator</Text>
							<View style={{ justifyContent: 'center', height: 80}}>
								<Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FF9973' }}>{this.state.operatorName}</Text>
							</View>
						</View>

						<View style={{ alignItems: 'center'}}>
							<Text style={styles.operatorInfoLabel}>Kod sieci</Text>
							<View style={{ justifyContent: 'center', height: 80}}>
								<Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FF9973' }}>{this.state.operatorCode}</Text>
							</View>
						</View>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	contactInfo: {
		marginTop: '35%',
		alignItems: 'center',
		marginBottom: 70
	},

	contactName: {
		fontWeight: 'bold',
		color: '#4B4B4B',
		marginBottom: 5,
		fontSize: 31,
	},

	contactNumber: {
		fontWeight: '600',
		fontSize: 20,
		color: '#D9D9D9'
	},

	operatorInfo: {
		flexDirection: 'row',
		justifyContent: 'center'
	},

	operatorInfoLabel: {
		fontSize: 28,
		marginBottom: 10,
		color: '#4B4B4B'
	}
});