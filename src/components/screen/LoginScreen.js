import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class LoginScreen extends Component {
    static navigationOptions = {
        title: "LOGIN",
        headerShown: false
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 30, backgroundColor: 'rgb(205, 111, 130)' }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Cashierun App!</Text>
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" placeholderTextColor="#ffffff" selectionColor="#fff" keyboardType="email-address" onSubmitEditing={() => this.password.focus()} />
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Password" secureTextEntry={true} placeholderTextColor="#ffffff" ref={(input) => this.password = input} />
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
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
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

export default LoginScreen;