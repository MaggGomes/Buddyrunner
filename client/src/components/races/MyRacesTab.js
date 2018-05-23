import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default class MyRacesTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-person" size={24} color={tintColor} />
        )
    };

    constructor(){
        super();
        this.state = {
            data: [],
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        axios.get('https://buddyrunner.herokuapp.com/runs')
            .then((res)=>{
                this.setState({
                   loading: false,
                    data: res.data
                });
            })
            .catch((error)=>{
               this.setState({
                  loading: false,
                  error: error
               });
            });
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.container}>
            <ListItem
                roundAvatar
                title={item.location}
                subtitle={item.distance.value+item.distance.unit}
                avatar={{uri: item.creator.image}}
            />
        </TouchableOpacity>
    );

    _keyExtractor = (item) => item.id.toString();

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