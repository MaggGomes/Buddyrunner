import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {connect} from "react-redux";
import {fetchCreatedRuns, fetchMyRuns} from "../../actions/runsActions";

class MyRacesTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-person" size={24} color={tintColor} />
        )
    };

    componentDidMount() {
        this.props.dispatch(fetchCreatedRuns());
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
                    data={this.props.runs.myCreatedRuns}
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

export default connect(store => ({runs: store.runs}))(MyRacesTab);