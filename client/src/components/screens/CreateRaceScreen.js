import React, { Component } from 'react';
import CreateRaceForm from '../forms/CreateRaceForm'
import {createRun} from "../../actions/runsActions";
import {connect} from "react-redux";

class CreateRaceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {distance: 0};
    }
    
    setPath = (path, distance) => {
        this.setState({path: path, distance: distance});
    };

    handleSubmit = async (values) => {
        await this.props.dispatch(createRun(
            values.Date,
            this.state.distance,
            this.state.path,
            values.Duration)
        );

        this.props.navigation.navigate('Home');
    };

    render() {
        return (
            <CreateRaceForm onSubmit={this.handleSubmit} distance={this.state.distance} setPath={this.setPath}/>
        );
    }
}

export default connect(store => ({auth: store.auth, runs: store.runs}))(CreateRaceScreen);