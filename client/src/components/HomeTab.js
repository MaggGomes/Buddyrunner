import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from "react-redux";
import {fetchMyRuns} from "../actions/runsActions";

class HomeTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-home" size={24} color={tintColor} />
        )
    };

    componentDidMount(){
        this.props.dispatch(fetchMyRuns());
    }

    _renderItem = ({item}) => (
        <TouchableOpacity style={styles.container} onPress={() => {
            this.props.navigation.navigate('GoRun', {
                id: item.id,
                date: item.date,
                distance: item.distance,
                location: item.location
            });
        }}>
            <ListItem
                leftIcon={<Icons name="md-sunny" size={36} color={'#26a4f3'} />}
                title={
                    <View style={styles.nextRaces}>
                        <Text>{item.location}</Text>
                    </View>
                }
                subtitle={
                    <View style={styles.nextRaces}>
                        <Text style={{fontSize: 10}}>{item.date}</Text>
                    </View>
                }
            />
        </TouchableOpacity>
    );

    _keyExtractor = (item) => item.id.toString();

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.welcome}>Welcome <Text style={styles.userName}>{ this.props.auth.data.name }</Text></Text>
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
                <View style={styles.buttonContainer}>
                    <Button
                        title="Create Race"
                        titleStyle={{ fontWeight: "700" }}
                        buttonStyle={{
                            backgroundColor: "#26a4f3",
                            width: 200,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 10,
                            marginTop: 40,
                            marginBottom: 40
                        }}
                        containerStyle={{ marginTop: 20 }}
                    />
                </View>
                <View style={{paddingLeft: 20}}>
                    <Text style={{fontSize: 20}}>Next races</Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.props.runs.myRuns}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    welcome: {
        marginTop: 20,
        paddingLeft: 20,
        fontSize: 22
    },
    userName: {
        fontWeight: '600',
        color: 'black'
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
    nextRaces: {
        paddingLeft: 20,
        paddingRight: 20
    },
    nextRacesSub: {
      fontSize: 16
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
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

export default connect(store => ({auth: store.auth, runs: store.runs}))(HomeTab);