import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {Button} from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

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

				<MapView
				  provider={PROVIDER_GOOGLE}
				  style={styles.map}
				  region={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				  }}></MapView>
			
            <View style={styles.buttonContainer} >
                <Button block style = {{ backgroundColor: '#26a4f3', borderRadius: 0 }} onPress={handleSubmit}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
                </Button>
            </View>
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
    buttonContainer: {
        marginTop: 40,
        marginBottom: 40
    }
});

export default reduxForm({
    form: 'raceForm'
})(CreateRaceForm)