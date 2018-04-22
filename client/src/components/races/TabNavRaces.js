import React from 'react';
import { TabNavigator } from 'react-navigation';
import MyRacesTab from './MyRacesTab';
import FollowingRacesTab from './FollowingRacesTab';
import NearbyRacesTab from './NearbyRacesTab';
import Icons from 'react-native-vector-icons/MaterialIcons';

const TabNavRaces = TabNavigator({
    MyRaces: {
        screen: MyRacesTab
    },
    FollowingRaces: {
        screen: FollowingRacesTab
    },
    NearbyRaces: {
        screen: NearbyRacesTab
    }
}, {
    initialRouteName: 'MyRaces',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: 'white'
        },
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
            backgroundColor: '#26a4f3'
        },
        activeTintColor: '#26a4f3',
        inactiveTintColor: '#bfbfbf'
    }
});

TabNavRaces.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icons name="directions-run" size={24} color={tintColor} />
    )
};

export default TabNavRaces;