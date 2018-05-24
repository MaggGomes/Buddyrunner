import React from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import StackNav from "./StackNav";
import CreateRaceScreen from "./Screens/SettingsScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import AboutScreen from "./Screens/AboutScreen";
import {Dimensions} from "react-native";
import {Icon} from 'native-base';

/* Drawer content, with header included */
const DrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.container}>

            <Text style={styles.user}>Manuel Gomes</Text>
        </View>
        <View>
            <DrawerItems {...props} />
        </View>
    </ScrollView>
);

/* Drawer Navigation */
const DrawerNav = DrawerNavigator({
        Home: {
            screen: StackNav
        },
        CreateRace: {
            screen: CreateRaceScreen,
            navigationOptions: {
                title: 'Create Race',
                drawerIcon: ({tintColor}) => (
                    <Icon name="settings" size={25} tintColor="tintColor" />
                )
            }
        },

        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings',
                drawerIcon: ({tintColor}) => (
                    <Icon name="settings" size={25} tintColor="tintColor" />
                )
            }
        },
        About: {
            screen: AboutScreen,
            navigationOptions: {
                title: 'About',
                drawerIcon: ({tintColor}) => (
                    <Icon name="help-circle" size={25} tintColor="tintColor" />
                )
            }
        }
    }, {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        drawerWidth: Dimensions.get('window').width / 1.5,
        contentOptions: {
            activeTintColor: '#494949',
            inactiveTintColor:  '#494949'
        },
        contentComponent: DrawerContentComponent
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: '#0145CD',
    },
    user: {
        color: 'white', marginTop: 20
    }
});

export default DrawerNav;