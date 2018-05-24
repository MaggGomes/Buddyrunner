import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNav';
import LoginScreen from './screens/LoginScreen';

const MainStackNav = StackNavigator (
    {
        Login: {
            screen: LoginScreen
        },
        HomeDrawerNav: {
            screen: DrawerNav,
        }
    },
    {
        initialRouteName: 'Login'
    });

export default MainStackNav;