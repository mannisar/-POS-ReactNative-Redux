import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import { readOrder } from '../../redux/actions/order'

class HistoryScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "HISTORY",
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
        this.readOrder()
    }

    async readOrder() {
        await this.props.dispatch(readOrder())
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)", height: 110 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>User: {item.id_user}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>Total: {item.total}</Text>
                    <Text style={{ fontSize: 15, marginLef: 10, marginBottom: 4 }}>Date: {item.date}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 17, color: "rgb(205, 111, 130)" }}>DETAIL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { orders } = this.props
        return (
            <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                <FlatList
                    data={orders}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        )
    }
}

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//     head: { height: 40, backgroundColor: "rgb(205, 111, 130)" },
//     headText: { margin: 6, color: 'white', textAlign: 'center' },
//     text: { margin: 6, textAlign: 'center' },
//     row: {
//         flexDirection: 'row',
//         backgroundColor: 'white',
//         borderRadius: 8,
//         borderWidth: 0.5,
//         borderColor: '#d6d7da'
//     },
//     btn: { marginLeft: 14, width: 48, height: 20, backgroundColor: "rgb(205, 111, 130)", borderRadius: 2 },
//     btnText: { textAlign: 'center', color: '#fff' }
// });

const mapStateToProps = state => {
    return {
        orders: state.orders.orders
    }
}

export default connect(mapStateToProps)(HistoryScreen);