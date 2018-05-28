import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import {fetchPath} from "../../actions/runsActions";
import { connect, change } from "react-redux";

class RunMap extends Component {
	constructor(props) {
		super(props);
		this.state = {markers: [], distance: 0};
	};
    
    componentDidUpdate(prevProps, prevState) {
        this.props.setPath(this.state.polylineEncoded, this.state.distance);
    }
    
	handlePress = async (e) => {
		this.setState({markers: [...this.state.markers, e.nativeEvent.coordinate]}, async () => {
            if (this.state.markers.length > 1) {
                await this.props.dispatch(fetchPath(this.state.markers));
                var polylineEncoded = this.props.runs.path[0].overview_polyline.points;
                var polyline = this.decodePolyline(polylineEncoded);
                var dist = 0;
                for (var i = 0; i < this.props.runs.path[0].legs.length; i++) {
                    dist += this.props.runs.path[0].legs[i].distance.value;
                }
                this.setState({polylineEncoded: polylineEncoded, line: polyline, distance: dist});
            }
        });
    };
    
    decodePolyline = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
	
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
                
                {this.state.line &&
                <Polyline
                    coordinates={this.state.line}
                    strokeColor="#26a4f3"
                    strokeWidth={4}
                />
                }
                
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		height: 180
	}
});

export default connect(store => ({auth: store.auth, runs: store.runs}))(RunMap);