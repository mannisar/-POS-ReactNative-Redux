import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { addQty, reduceQty, deleteCart, cancleCart } from '../../redux/actions/cart'
import { orderCheckout } from '../../redux/actions/order'
import AsyncStorage from '@react-native-community/async-storage';

// import uuid from 'uniqid'

class CartScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "CART",
            headerStyle: {
                backgroundColor: 'rgb(205, 111, 130)'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    state = {
        id_user: 1//parseInt(AsyncStorage.getItem('user-id')),
        //id_order: `${uuid()}`
    }

    onAddQty = (id) => {
        this.props.dispatch(addQty(id))
    }

    onReduceQty = (id) => {
        this.props.dispatch(reduceQty(id))
    }

    onDeleteCart = (id) => {
        this.props.dispatch(deleteCart(id))
    }

    onCancleCart = (data) => {
        this.setState({
            show: false
        })
        this.props.dispatch(cancleCart(data))
    }

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    orderCheckout = (event) => {
        event.preventDefault()
        const data = {
            id_user: this.state.id_user,
            total: this.props.total,
            id_order: this.generateUUID(),
            product: this.props.carts
        }
        this.props.dispatch(orderCheckout(data))
        alert('Order Success!')
        // console.log(data)
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)", height: 120 }}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 2 }}>{item.name_product}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>Rp. {item.price}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 4 }}>Stock {item.stock}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => (this.onReduceQty(item.id))}>
                            <Text style={{ fontSize: 25, color: "rgb(205, 111, 130)" }}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10, marginTop: 6 }} >
                            <Text style={{ fontSize: 18 }}>{item.qty}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => (this.onAddQty(item.id))}>
                            <Text style={{ fontSize: 25, color: "rgb(205, 111, 130)" }}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10, marginTop: 1, backgroundColor: "rgb(205, 111, 130)" }} onPress={() => (this.onDeleteCart(item.id))}>
                            <Text style={{ fontSize: 18, color: "white", padding: 4 }}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { carts, total } = this.props
        return (
            <View style={{ margin: 10, flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={carts}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <View style={{ margin: 8, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Total Rp. {total}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10, marginBottom: 5, backgroundColor: "rgb(205, 111, 130)" }} onPress={this.orderCheckout} >
                            <Text style={{ color: "white" }}>CHECKOUT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10, backgroundColor: "rgb(205, 111, 130)" }} onPress={() => (this.onCancleCart(carts.id))}>
                            <Text style={{ color: "white" }}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.carts.carts,
        total: state.carts.total
    }
}

export default connect(mapStateToProps)(CartScreen);