import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox, StatusBar, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icons from 'react-native-vector-icons/Ionicons';
import {FETCH_SINGLE_RUN, FETCH_SINGLE_RUN_ERROR} from "../../actions/types";
import axios from "axios/index";

export default class RunScreen extends Component {

    constructor(){
        super();
        this.state = {
            data: [],
            loading: true,
            error: null
        }
    }

    componentDidMount(){

        /*axios.get('https://buddyrunner.herokuapp.com/runs/'+999414695026143200)
            .then((res) => {
                console.log(2222);
                console.log(res);
            })
            .catch((error) => {
                console.log(3333);
            });*/
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../static/img/map.png')}
                    style={styles.banner}
                />
                <Text style={styles.chrono}>00:00:00</Text>
                <Text>Duration</Text>
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