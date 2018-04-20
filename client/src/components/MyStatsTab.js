import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, StatusBar } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

export default class MyStatsTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-stats" size={24} color={tintColor} />
        )
    };

    render() {
        return (
            <View>
                <Text>
                    MyStats
                </Text>
            </View>
        );
    }
}