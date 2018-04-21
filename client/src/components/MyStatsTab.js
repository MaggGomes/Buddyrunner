import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';

export default class NearbyRacesTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-stats" size={24} color={tintColor} />
        )
    };

    constructor(){
        super();
        this.state = {
            data: [{
                id: '1',
                location: 'Porto',
                distance: '20km'
            },
                {
                    id: '2',
                    location: 'Vila do Conde',
                    distance: '10km'
                }],
            loading: true,
            error: null
        }
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.container}>
            <ListItem
                title={item.location}
                subtitle={item.distance}
            />
        </TouchableOpacity>
    );

    _keyExtractor = (item) => item.id;

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
});