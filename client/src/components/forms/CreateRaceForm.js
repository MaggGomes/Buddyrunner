import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Field, reduxForm} from 'redux-form';

const submit = (values) => {
    console.log('submitting form', values)
};

const renderField = ({ label, keyboardType, name, input: { onChange, ...restInput } }) => {
    return (
        <TextInput style={ styles.input }
                   onChangeText = { onChange } { ...restInput }
                   keyboardType={keyboardType}
                   placeholder={label}
                   selectionColor="#26a4f3"
                   underlineColorAndroid="transparent"
        />
    )
};

const CreateRaceForm = props => {
    const { handleSubmit } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Create Race</Text>
            <Field keyboardType="default" label="Date" component={renderField} name="Date" {...Date} />
            <Field keyboardType="default" label="Location" component={renderField} name="Location" />
            <Field keyboardType="default" label="Distance" component={renderField} name="Distance" />
            <Field keyboardType="default" label="Duration" component={renderField} name="Duration" />

            <TouchableOpacity style={styles.formSubmitContainer} onPress={handleSubmit}>
                <Text style={styles.formSubmit}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'stretch'
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#26a4f3',
        marginBottom: 40
    },
    input: {
        height: 40,
        borderBottomColor: '#26a4f3',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    formSubmitContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#26a4f3',
        justifyContent: 'center',
        height: 40,
        marginTop: 20
    },
    formSubmit: {
        backgroundColor: '#26a4f3',
        color: 'white',
        borderWidth: 0,
        fontWeight: 'bold',
        alignSelf: 'stretch',
        textAlign: 'center'
    }
});

export default reduxForm({
    form: 'raceForm'
})(CreateRaceForm)