import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, StatusBar, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';

export default class MyRacesTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Icons name="md-home" size={24} color={tintColor} />
        )
    };

    constructor(){
        super();
        this.state = {
            data: [],
            loading: true,
            error: null
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../static/img/map.png')}
                    style={styles.banner}
                />
                <Text style={styles.chrono}>00:00:00</Text>
                <Text style={{}}>Duration</Text>
                <Button
                    title="Go"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "#26a4f3",
                        width: 200,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginTop: 20
                    }}
                    containerStyle={{ marginTop: 20 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    chrono: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#494949',
        marginTop: 40
    },
    banner: {
        height: '60%',
        width: '100%'
    },
    wrapper: {
        flex: 1
    }
});