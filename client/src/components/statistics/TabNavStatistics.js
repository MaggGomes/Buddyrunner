import React from 'react';
import { TabNavigator } from 'react-navigation';
import StatisticsTab from './StatisticsTab';
import PastRacesTab from './PastRacesTab';
import Icons from 'react-native-vector-icons/Ionicons';

const TabNavStatistics = TabNavigator({
    Statistics: {
        screen: StatisticsTab
    },
    PastRaces: {
        screen: PastRacesTab
    }
}, {
    initialRouteName: 'Statistics',
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

TabNavStatistics.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icons name="md-stats" size={24} color={tintColor} />
    )
};

export default TabNavStatistics;