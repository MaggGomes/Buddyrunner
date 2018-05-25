import React, { Component } from 'react';
import CreateRaceForm from '../forms/CreateRaceForm'
import {createRun} from "../../actions/runsActions";
import {connect} from "react-redux";

class CreateRaceScreen extends Component {

    handleSubmit = (values) => {
        this.props.dispatch(createRun(
            values.Date,
            values.Location,
            values.Distance,
            values.Duration));
    };

    render() {
        return (
            <CreateRaceForm onSubmit={this.handleSubmit}/>
        );
    }
}

export default connect(store => ({auth: store.auth, runs: store.runs}))(CreateRaceScreen);