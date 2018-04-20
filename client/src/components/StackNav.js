import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListScreen from './ListScreen';
import DayScreen from './DayScreen';
import TabNav from './TabNav';
import Icons from 'react-native-vector-icons/Ionicons';

const StackNav = StackNavigator (
    {
        Home: {
            screen: TabNav,
        },
        List: {
            Settings: SettingsScreen
        },
        About: {
            screen: AboutScreen
        }
    },
    {
        initialRouteName: 'Home'
    });

export default StackNav;