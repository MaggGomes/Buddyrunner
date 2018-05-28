import React from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import TabNav from "./TabNav";
import CreateRaceScreen from "./screens/CreateRaceScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AboutScreen from "./screens/AboutScreen";
import {Icon} from 'native-base';

/* Drawer content, with header included */
const DrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.container}>
			<Image
                    source={{uri: 'http://pbs.twimg.com/profile_images/999379008180535297/_K7Qvdm7_normal.jpg'}}
                    style={{width: 80, height: 80, borderRadius: 50}}/>
            <Text style={styles.name}>Pedro Esteves</Text>
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
                    <Icon name="home" style={{fontSize: 25, color: tintColor}} />
                )
            }
        },
        CreateRace: {
			screen: CreateRaceScreen,
            navigationOptions : ({navigation}) => {
                const {params} = navigation.state;

                return {
                    headerTitle: 'Search',
                    headerStyle: {
                        backgroundColor: 'white',
                        elevation: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: '#bfbfbf'
                    },
                    headerTitleStyle: {
                        color: '#bfbfbf'
                    },
                    headerLeft: (
                        <TouchableOpacity style={{paddingLeft: 20}} onPress={() => alert('search something')}>
                            <Icon name="search" style={{fontSize: 30, color: "#bfbfbf"}} />
                        </TouchableOpacity>
                    ),
                    headerRight: (
                        <TouchableOpacity style={{paddingRight: 20}} onPress={() => navigation.navigate('DrawerOpen')}>
                            <Image
                                source={{uri: 'http://pbs.twimg.com/profile_images/999379008180535297/_K7Qvdm7_normal.jpg'}}
                                style={{width: 40, height: 40, borderRadius: 50}}/>
                        </TouchableOpacity>
                    ),
                    drawerIcon: ({tintColor}) => (
                        <Icon name="md-calendar" style={{fontSize: 25, color: tintColor}} />
                    )
                }
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Settings',
                drawerIcon: ({tintColor}) => (
                    <Icon name="settings" style={{fontSize: 25, color: tintColor}} />
                )
            }
        },
        About: {
            screen: AboutScreen,
            navigationOptions: {
                title: 'About',
                drawerIcon: ({tintColor}) => (
                    <Icon name="help-circle" style={{fontSize: 25, color: tintColor}} />
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