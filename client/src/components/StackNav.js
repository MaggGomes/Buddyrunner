import React from 'react';
import { StackNavigator } from 'react-navigation';
import TabNav from './TabNav';
import RunScreen from './screens/RunScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import TabContainer from './TabNav';
import LoginScreen from './screens/LoginScreen';

const StackNav = StackNavigator (
    {
        Login: {
            screen: LoginScreen
        },
        Home: {
            screen: TabContainer,
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
        initialRouteName: 'Login'
    });

export default StackNav;