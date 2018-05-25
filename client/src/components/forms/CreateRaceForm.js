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
        alignItems: 'center'
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 200,
        textAlign: 'left',
        margin: 10,
        color: '#26a4f3'
    },
    input: {
        borderColor: '#26a4f3',
        borderWidth: 2,
        borderRadius: 10,
        height: 37,
        width: 220,
        marginBottom: 20
    },
    formSubmitContainer: {
        alignItems: 'center'
    },
    formSubmit: {
        backgroundColor: '#26a4f3',
        color: 'white',
        height: 37,
        width: 220,
        borderWidth: 0,
        borderRadius: 10,
        textAlign: 'center'
    }
});

export default reduxForm({
    form: 'raceForm'
})(CreateRaceForm)