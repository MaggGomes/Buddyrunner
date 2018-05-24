import React, { Component } from 'react';
import { NativeModules, Text, View, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

/* from https://github.com/GoldenOwlAsia/react-native-twitter-signin/ */
const { RNTwitterSignIn } = NativeModules;

const Constants = {
    TWITTER_COMSUMER_KEY: 'QZVbxlEKetOIdlXa28eNIxw0W',
    TWITTER_CONSUMER_SECRET: 'nKO7bGTK6IamSeA8swBwcbJk6V4UwREVQBYfQFO52N3kt3RDEa'
};

export default class LoginScreen extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
            error: null
        }
    }

    _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
    RNTwitterSignIn.logIn()
      .then(loginData => {
        const { authToken, authTokenSecret, userID, userName, name } = loginData;

        if (authToken && authTokenSecret) {
            axios.post('https://buddyrunner.herokuapp.com/auth', {
                id: userID,
                user_name: userName,
                name: name,
                token: authToken,
                secret: authTokenSecret
            })
                .then((res)=>{
                    this.setState({
                        isLoggedIn: true
                    }, ()=>{
                        const {navigate} = this.props.navigation;
                        navigate('Home', {name: res.data.name, image: res.data.image_url});
                    })
                })
                .catch((error)=>{
                    this.setState({
                        error: error
                    });
                });
        }
      })
      .catch(error => {
        console.log(error)
      }
    )
  };

  handleLogout = () => {
    console.log("logout");
    RNTwitterSignIn.logOut();
    this.setState({
      isLoggedIn: false
    })
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <View style={{ flex: 1 }}>
		  {isLoggedIn
			  ? <TouchableOpacity onPress={this.handleLogout}>
				  <Text>Log out</Text>
			  </TouchableOpacity>
			  : <Button
				  title="Login with Twitter"
				  titleStyle={{fontWeight: "700"}}
				  buttonStyle={{
					  backgroundColor: "#26a4f3",
					  width: 200,
					  height: 45,
					  borderColor: "transparent",
					  borderWidth: 0,
					  borderRadius: 5,
					  marginTop: 40,
					  marginBottom: 40
				  }}
				  containerStyle={{marginTop: 20}}
				  onPress={this._twitterSignIn}
			  />
		  }
      </View>
    )
  }
}