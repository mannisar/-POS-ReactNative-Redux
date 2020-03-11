import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import { readProduct, deleteProduct } from '../../redux/actions/product'

class ProductScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => (
                <TouchableOpacity
                    style={{ backgroundColor: 'white', border: '1px solid #000', padding: 8, justifyContent: 'center', alignItems: 'center', width: 100, marginRight: 20 }}
                    onPress={() => navigation.navigate('ProductAdd')}>
                    <Text style={{ fontWeight: 'bold', color: "rgb(205, 111, 130)" }}>ADD</Text>
                </TouchableOpacity>
            ),
            title: "PRODUCT",
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
        this.readProduct()
    }

    async readProduct() {
        await this.props.dispatch(readProduct())
    }

    onDelete = async (productId) => {
        await this.props.dispatch(deleteProduct(productId))
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)", height: 110 }}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 2 }}>{item.name_product}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 2 }}>Rp. {item.price}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10, marginBottom: 4 }}>Stock {item.stock}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.navigation.navigate('ProductEdit', {
                            product: item
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
        const { products } = this.props
        return (
            <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                <FlatList
                    data={products}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps)(ProductScreen);