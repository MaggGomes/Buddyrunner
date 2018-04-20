import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, StatusBar } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

export default class PastTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="logo-twitter" size={24} color={tintColor} />
        )
    };

    render() {
        return (
            <View>
                <Text>
                    PastRaces
                </Text>
            </View>
        );
    }
}