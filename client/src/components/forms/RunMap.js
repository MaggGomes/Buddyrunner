import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

class RunMap extends Component {
	constructor(props) {
		super(props);
		this.state = {markers: []};
	}
	
	handlePress = (e) => {
		this.setState({markers: [...this.state.markers, e.nativeEvent.coordinate]});
		if (this.state.markers.length > 1) {
						
		}
    };
	
	render() {
        return (
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={{
					latitude: 41.157600,
					longitude: -8.629302,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				}}
				onPress={this.handlePress}>
				
				{this.state.markers.map((marker, i) => (
					<Marker
						key={i} coordinate={marker}
					/>
				))}
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		height: 180
	}
});

export default RunMap;