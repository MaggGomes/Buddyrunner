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
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        upperCaseLabel: false,
        style: {
            backgroundColor: 'white'
        },
        activeTintColor: '#26a4f3',
        inactiveTintColor: '#bfbfbf',
        showIcon: true,
        showLabel: false,
        renderIndicator: () => null
    },
    navigationOptions: {
        headerTitle: 'Buddyrunner',
        headerStyle: {
            backgroundColor: 'white',
            elevation: 0, // Removes bottom shadow of the nav bar
            borderBottomWidth: 1,
            borderBottomColor: '#bfbfbf'
        },
        headerTitleStyle: {
            color: '#26a4f3',
            fontSize: 18
        },
        headerLeft: (
            <TouchableOpacity style={{paddingLeft:20}} onPress={() => alert('search something')}>
                <Icons name="md-menu" size={30} color="#26a4f3" />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity style={{paddingRight:20}} onPress={() => alert('search something')}>
                <Icons name="md-search" size={30} color="#26a4f3" />
            </TouchableOpacity>
        )
    }
});

export default TabNav;