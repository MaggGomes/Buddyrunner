import React from 'react';
import { StackNavigator } from 'react-navigation';
import SettingsScreen from './SettingsScreen';
import AboutScreen from './AboutScreen';
import TabNav from './TabNav';
import Icons from 'react-native-vector-icons/Ionicons';

const StackNav = StackNavigator (
    {
        Home: {
            screen: TabNav,
        },
        Settings: {
            screen: SettingsScreen
        },
        About: {
            screen: AboutScreen
        }
    },
    {
        initialRouteName: 'Home'
    });

export default StackNav;