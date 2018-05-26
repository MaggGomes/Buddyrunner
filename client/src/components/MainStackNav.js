import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNav';
import LoginScreen from './screens/LoginScreen';
import RunScreen from './screens/RunScreen';

const MainStackNav = StackNavigator (
    {
        Login: {
            screen: LoginScreen
        },
        HomeDrawerNav: {
            screen: DrawerNav
        },
        RunScreen: {
            screen: RunScreen
        }
    },
    {
        initialRouteName: 'Login'
    });

export default MainStackNav;