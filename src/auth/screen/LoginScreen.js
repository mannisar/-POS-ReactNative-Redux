import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends Component {
    static navigationOptions = {
        title: "LOGOUT",
        headerShown: false
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        // if (AsyncStorage.getItem('token')) {
        //     this.props.navigation.navigate('Home');
        // }
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://192.168.1.18:3004/api/user/login", this.state)
            .then(res => {
                AsyncStorage.setItem('token', JSON.stringify(res.data.result.token));
                AsyncStorage.setItem('user-id', JSON.stringify(res.data.result.id));
                AsyncStorage.setItem('role', JSON.stringify(res.data.result.role));
                AsyncStorage.setItem('name', JSON.stringify(res.data.result.name));
                this.props.navigation.navigate('Home');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 30, backgroundColor: 'rgb(205, 111, 130)' }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Cashierun App!</Text>
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" placeholderTextColor="#ffffff" selectionColor="#fff" keyboardType="email-address" onSubmitEditing={() => this.password.focus()} onChangeText={(text) => this.setState({ email: text })} />
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Password" secureTextEntry={true} placeholderTextColor="#ffffff" ref={(input) => this.password = input} onChangeText={(text) => this.setState({ password: text })} />
                <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center'
    }
});

export default LoginScreen;