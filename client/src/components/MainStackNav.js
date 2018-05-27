import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNav';
import LoginScreen from './screens/LoginScreen';
import RunScreen from './screens/RunScreen';
import { Image, TouchableOpacity} from 'react-native';

const MainStackNav = StackNavigator (
    {
        Login: {
            screen: LoginScreen
        },
        HomeDrawerNav: {
            screen: DrawerNav
        },
        RunScreen: {
            screen: RunScreen,
            navigationOptions : ({navigation}) => {
                return {
                    headerStyle: {
                        backgroundColor: 'white',
                        elevation: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: '#bfbfbf'
                    },
                    headerTitleStyle: {
                        color: '#bfbfbf'
                    },
                    headerRight: (
                        <TouchableOpacity style={{paddingRight: 20}} onPress={() => navigation.navigate('DrawerOpen')}>
                            <Image
                                source={{uri: 'http://pbs.twimg.com/profile_images/999379008180535297/_K7Qvdm7_normal.jpg'}}
                                style={{width: 40, height: 40, borderRadius: 50}}/>
                        </TouchableOpacity>
                    )
                }
            }
        }
    },
    {
        initialRouteName: 'Login'
    });

export default MainStackNav;