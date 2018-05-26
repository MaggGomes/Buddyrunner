import React, { Component } from 'react';
import {
    StyleSheet,
    YellowBox
} from 'react-native';
import MainStackNav from './components/MainStackNav';
import {Provider} from 'react-redux';
import store from './store/store';

YellowBox.ignoreWarnings([
    'Warning: isMounted',
]);

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <MainStackNav/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
