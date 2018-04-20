import React from 'react';
import { TabNavigator } from 'react-navigation';
import { ScrollView, FlatList, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MyRacesTab from './MyRacesTab';
import MyStatsTab from './MyStatsTab';
import FollowingTab from './FollowingRacesTab';
import NearbyRacesTab from './NearbyRacesTab';
import PastRacesTab from './PastRacesTab';
import Icons from 'react-native-vector-icons/Ionicons';

const TabNav = TabNavigator({
    MyRaces: {
        screen: MyRacesTab
    },
    MyStats: {
        screen: MyStatsTab
    },
    FollowingRaces: {
        screen: FollowingTab
    },
    NearbyRaces: {
        screen: NearbyRacesTab
    },
    PastRaces: {
        screen: PastRacesTab

    }
}, {
    initialRouteName: 'MyRaces',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        upperCaseLabel: false,
        style: {
            backgroundColor: '#788691'
        },
        indicatorStyle: {
            backgroundColor: 'white'
        }
    },
    navigationOptions: {
        title: "Buddyrunner",
        headerStyle: {
            backgroundColor: '#788691',
            elevation: 0, // Removes bottom shadow of the nav bar
            borderBottomWidth: 1,
            borderBottomColor: '#67758b',
        },
        headerTitleStyle: {
            color: '#ffffff'
        },
        headerLeft: (
            <TouchableOpacity style={{paddingLeft:20}} onPress={() => alert('search something')}>
                <Icons name="md-menu" size={30} color="#ffff" />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity style={{paddingRight:20}} onPress={() => alert('search something')}>
                <Icons name="md-search" size={30} color="#ffff" />
            </TouchableOpacity>
        )
    }
});

export default TabNav;