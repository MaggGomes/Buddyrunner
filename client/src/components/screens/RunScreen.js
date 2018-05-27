import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import {connect} from "react-redux";
import {fetchSingleRun} from "../../actions/runsActions";

class RunScreen extends Component {

    componentDidMount(){
        const { params } = this.props.navigation.state;

        this.props.dispatch(fetchSingleRun(params.id));
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Card style={{flex: 0}}>
                    <CardItem bordered>
                        <Left>
                            {this.props.runs.singleRun.creator !== undefined && <Thumbnail source={{uri: this.props.runs.singleRun.creator.image}} />}
                            <Body>
                                <Text style={styles.bluecolor}>{this.props.runs.singleRun.creator !== undefined && this.props.runs.singleRun.creator.name}</Text>
                                <Text style={{fontSize: 10}} note>Event Creator</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem bordered>
                        <Text><Text style={styles.bluecolor}>Forecasted Weather: </Text></Text>
                        <Left>
                            {this.props.runs.singleRun.weather !== undefined && <Thumbnail source={{uri: 'http://openweathermap.org/img/w/'+this.props.runs.singleRun.weather.weather_icon+'.png'}} />}
                            <Body>
                            <Text>{this.props.runs.singleRun.weather !== undefined && Math.round(this.props.runs.singleRun.weather.temperature)}º C</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Text><Text style={styles.bluecolor}>Estimated duration: </Text>{this.props.runs.singleRun.duration}</Text>
                        <Text><Text style={styles.bluecolor}>Estimated distance: </Text>{this.props.runs.singleRun.distance !== undefined && this.props.runs.singleRun.distance.value+this.props.runs.singleRun.distance.unit}</Text>
                        <Text><Text style={styles.bluecolor}>Location: </Text>{this.props.runs.singleRun.location}</Text>
                        <Text><Text style={styles.bluecolor}>Date: </Text>{this.props.runs.singleRun.date !== undefined && this.props.runs.singleRun.date.slice(0, 10)}</Text>
                        <Text><Text style={styles.bluecolor}>Hour: </Text>{this.props.runs.singleRun.date !== undefined && this.props.runs.singleRun.date.slice(11, 16)}</Text>
                        </Body>
                    </CardItem>
                </Card>

                <Text style={styles.chrono}>00:00:00</Text>

                <View style={styles.buttonContainer} >
                    <Button block style = {{ backgroundColor: '#26a4f3', borderRadius: 0 }}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Start</Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    chrono: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#494949',
        marginTop: 40,
        textAlign: 'center'
    },
    bluecolor:{
      color: '#26a4f3'
    },
    banner: {
        height: '60%',
        width: '100%'
    },
    weatherContainer: {
        width: 300,
        height: 300,
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row'
    },
    weather: {
        height: 60,
        width: 60
    },
    wrapper: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 40,
        marginBottom: 40
    }
});

export default connect(store => ({runs: store.runs}))(RunScreen);