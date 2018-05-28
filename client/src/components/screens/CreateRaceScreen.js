import React, { Component } from 'react';
import CreateRaceForm from '../forms/CreateRaceForm'
import {createRun} from "../../actions/runsActions";
import {connect} from "react-redux";

class CreateRaceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {distance: 0};
    }
    
    setDistance = (value) => {
        this.setState({distance: value});
    };

    handleSubmit = async (values) => {
        await this.props.dispatch(createRun(
            values.Date,
            values.Location,
            this.state.distance,
            values.Duration)
        );

        this.props.navigation.navigate('Home');
    };

    render() {
        return (
            <CreateRaceForm onSubmit={this.handleSubmit} distance={this.state.distance} setDistance={this.setDistance}/>
        );
    }
}

export default connect(store => ({auth: store.auth, runs: store.runs}))(CreateRaceScreen);