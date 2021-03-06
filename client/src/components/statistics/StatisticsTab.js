import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, StatusBar, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';

export default class StatisticsTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-man" size={24} color={tintColor} />
        )
    };

    constructor(){
        super();
        this.state = {
            data: [{
                id: '1',
                user: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                location: 'Porto',
                distance: '20km'
            },
                {
                    id: '2',
                    user: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                    location: 'Vila do Conde',
                    distance: '10km'
                },
                {
                    id: '3',
                    user: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    location: 'Matosinhos',
                    distance: '8km'
                },
                {
                    id: '4',
                    user: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
                    location: 'Porto',
                    distance: '20km'
                },
                {
                    id: '5',
                    user: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    location: 'Maia',
                    distance: '10km'
                },
            ],
            loading: true,
            error: null
        }
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.container}>
            <ListItem
                roundAvatar
                title={item.location}
                subtitle={item.distance}
                avatar={{uri: item.user}}
            />
        </TouchableOpacity>
    );

    _keyExtractor = (item) => item.id;

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.stats}>
                    <View style={styles.statsView}>
                        <View style={styles.cardValue}>
                            <Text style={styles.textValue}>19</Text>
                        </View>
                        <View style={styles.cardFooter}>
                            <Text style={styles.textFooter}>Races</Text>
                        </View>
                    </View>
                    <View style={styles.statsView}>
                        <View style={styles.cardValue}>
                            <Text style={styles.textValue}>364</Text>
                        </View>
                        <View style={styles.cardFooter}>
                            <Text style={styles.textFooter}>Distance (km)</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.stats}>
                    <View style={styles.statsView}>
                        <View style={styles.cardValue}>
                            <Text style={styles.textValue}>9.8</Text>
                        </View>
                        <View style={styles.cardFooter}>
                            <Text style={styles.textFooter}>Avg speed (km/h)</Text>
                        </View>
                    </View>
                    <View style={styles.statsView}>
                        <View style={styles.cardValue}>
                            <Text style={styles.textValue}>19235</Text>
                        </View>
                        <View style={styles.cardFooter}>
                            <Text style={styles.textFooter}>Calories</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    stats: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 34,
        alignItems: 'center'
    },
    statsView: {
        backgroundColor: '#26a4f3',
        width: 150,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardValue: {
        paddingTop: 30
    },
    textValue: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 40
    },
    cardFooter: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(191,191,191,.8)',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFooter: {
        color: 'white',
        fontSize: 15
    }
});