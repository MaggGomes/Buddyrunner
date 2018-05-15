import React from 'react';
import { StackNavigator } from 'react-navigation';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import TabNav from './TabNav';

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