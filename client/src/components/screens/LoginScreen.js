import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import {connect} from 'react-redux';
import {authLoginUser, authLogoutUser} from '../../actions/authActions'

class LoginScreen extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
            error: null
        }
    }

    _signIn = async () => {
        try {
            await this.props.dispatch(authLoginUser());
            const {navigate} = this.props.navigation;

            navigate('Home', {image: this.props.auth.data.image_url});

        } catch(error) {
            console.log(error);
        }
  };

  handleLogout = () => {
      this.props.dispatch(authLogoutUser());
  };

  render() {
    const isLoggedIn = this.props.isLoggedIn;
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
				  onPress={this._signIn}
			  />
		  }
      </View>
    )
  }
}

export default connect(store => ({auth: store.auth}))(LoginScreen);