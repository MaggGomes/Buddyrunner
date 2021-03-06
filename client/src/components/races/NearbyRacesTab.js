import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';

export default class NearbyRacesTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-pin" size={24} color={tintColor} />
        )
    };

    constructor(){
        super();
        this.state = {
            data: [{
                id: '1',
                user: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                location: 'Porto',
                distance: '20km'
            },
                {
                    id: '2',
                    user: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                    location: 'Vila do Conde',
                    distance: '10km'
                },
                {
                    id: '3',
                    user: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    location: 'Matosinhos',
                    distance: '8km'
                },
                {
                    id: '4',
                    user: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                    location: 'Porto',
                    distance: '20km'
                },
                {
                    id: '5',
                    user: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    location: 'Maia',
                    distance: '10km'
                },
                {
                    id: '6',
                    user: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                    location: 'Maia',
                    distance: '30km'
                },
                {
                    id: '7',
                    user: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    location: 'Valongo',
                    distance: '12km'
                },
                {
                    id: '8',
                    user: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                    location: 'Porto',
                    distance: '16km'
                },
                {
                    id: '9',
                    user: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    location: 'Maia',
                    distance: '10km'
                }],
            loading: true,
            error: null
        }
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.container}>
            <ListItem
                roundAvatar
                title={item.location}
                subtitle={item.distance}
                avatar={{uri: item.user}}
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