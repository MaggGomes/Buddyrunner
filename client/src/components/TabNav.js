import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Image, TouchableOpacity } from 'react-native';
import HomeTab from './HomeTab';
import TabNavRaces from './races/TabNavRaces';
import TavNavStatistics from './statistics/TabNavStatistics';
import Icons from 'react-native-vector-icons/Ionicons';

const TabNav = TabNavigator({
    Home: {
        screen: HomeTab
    },
    Races: {
        screen: TabNavRaces
    },
    Statistics: {
        screen: TavNavStatistics
    }
}, {
    initialRouteName: 'Home',
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
    navigationOptions : ({navigation}) => {
        const { params } = navigation.state;

        return {
            headerTitle: 'Search',
            headerStyle: {
                backgroundColor: 'white',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#bfbfbf'
            },
            headerTitleStyle: {
                color: '#bfbfbf'
            },
            headerLeft: (
                <TouchableOpacity style={{paddingLeft:20}} onPress={() => alert('search something')}>
                    <Icons name="md-search" size={30} color="#bfbfbf" />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity style={{paddingRight:20}} onPress={() => alert('search something')}>
                    <Image source={{uri: params.image}} style={{width: 40, height: 40, borderRadius: 50}} />
                </TouchableOpacity>
            )

        }
    }
});

export default TabNav;