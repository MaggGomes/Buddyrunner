import React from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import TabNav from "./TabNav";
import CreateRaceScreen from "./screens/CreateRaceScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AboutScreen from "./screens/AboutScreen";
import {Dimensions} from "react-native";
import {Icon} from 'native-base';

/* Drawer content, with header included */
const DrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.container}>

            <Text style={styles.name}>Buddyrunner</Text>
        </View>
        <View>
            <DrawerItems {...props} />
        </View>
    </ScrollView>
);

/* Drawer Navigation */
const DrawerNav = DrawerNavigator({
        Home: {
            screen: TabNav,
            navigationOptions: {
                title: 'Home',
                drawerIcon: ({tintColor}) => (
                    <Icon name="md-home" size={25} tintColor="tintColor" />
                )
            }
        },
        CreateRace: {
            screen: CreateRaceScreen,
            navigationOptions: {
                title: 'Create Race',
                drawerIcon: ({tintColor}) => (
                    <Icon name="md-calendar" size={25} tintColor="tintColor" />
                )
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings',
                drawerIcon: ({tintColor}) => (
                    <Icon name="md-settings" size={25} tintColor="tintColor" />
                )
            }
        },
        About: {
            screen: AboutScreen,
            navigationOptions: {
                title: 'About',
                drawerIcon: ({tintColor}) => (
                    <Icon name="md-help-circle" size={25} tintColor="tintColor" />
                )
            }
        }
    }, {
        initialRouteName: 'Home',
        drawerPosition: 'right',
        drawerWidth: Dimensions.get('window').width / 1.5,
        contentOptions: {
            activeTintColor: '#26a4f3',
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
        backgroundColor: '#26a4f3',
    },
    name: {
        color: 'white', marginTop: 20
    }
});

export default DrawerNav;