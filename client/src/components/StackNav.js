import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNav from './TabNav';
import RunScreen from './screens/RunScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';

const StackNav = StackNavigator (
    {
        Home: {
            screen: TabNav,
        },
        GoRun: {
            screen: RunScreen,
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