import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {connect} from 'react-redux';
import {authLoginUser, authLogoutUser} from '../../actions/authActions';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';

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
      <View style={styles.container}>
		  {isLoggedIn
			  ? <TouchableOpacity onPress={this.handleLogout}>
				  <Text>Log out</Text>
			  </TouchableOpacity>
			  : <View>
			  <View style={{alignItems: 'center'}}>
			  <Image
                source={require('../../static/img/sprint.png')}
                style={styles.logo}
            />
			  </View>
			  
			 
			  <View style={styles.buttonContainer} >
                    <Button block style = {{ backgroundColor: '#26a4f3', borderRadius: 0 }} onPress={this._signIn}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
                    </Button>
                </View>
			  
			  </View>
			  
			  
		  }
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		justifyContent: 'center'		
	},
	logo: {
		width: 100,
		height: 100
	},
	buttonContainer: {
        marginTop: 40,
        marginBottom: 40,
		paddingLeft: 20,
		paddingRight: 20
    }
});

export default connect(store => ({auth: store.auth}))(LoginScreen);