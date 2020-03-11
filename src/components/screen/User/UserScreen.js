import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import { readUser, deleteUser } from '../../redux/actions/user'

class UserScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => (
                <TouchableOpacity
                    style={{ backgroundColor: 'white', border: '1px solid #000', padding: 8, justifyContent: 'center', alignItems: 'center', width: 100, marginRight: 20 }}
                    onPress={() => navigation.navigate('UserAdd')}>
                    <Text style={{ fontWeight: 'bold', color: "rgb(205, 111, 130)" }}>ADD</Text>
                </TouchableOpacity>
            ),
            title: "USER",
            headerStyle: {
                backgroundColor: 'rgb(205, 111, 130)'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    componentDidMount() {
        this.readUser()
    }

    async readUser() {
        await this.props.dispatch(readUser())
    }

    onDelete = async (userId) => {
        await this.props.dispatch(deleteUser(userId))
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)", height: 110 }}>
                <Image source={{ uri: "https://i.ya-webdesign.com/images/male-avatar-icon-png-18.png" }} style={{ width: 100, height: 100 }} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 2 }}>{item.name}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>{item.email}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 4 }}>{item.role}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.navigation.navigate('UserEdit', {
                            user: item
                        })}>
                            <Text style={{ fontSize: 17, color: "rgb(205, 111, 130)" }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.onDelete(item.id)}>
                            <Text style={{ fontSize: 17, color: "rgb(205, 111, 130)" }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { users } = this.props
        return (
            <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                <FlatList
                    data={users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users
    }
}

export default connect(mapStateToProps)(UserScreen);