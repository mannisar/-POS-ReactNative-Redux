import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, FlatList, Image, Alert, Picker, Platform, StyleSheet } from 'react-native';

import { readProduct } from '../../redux/actions/product'
import { readCategory } from '../../redux/actions/category'
import { addToCart } from "../../redux/actions/cart"
import { TextInput } from 'react-native-gesture-handler';

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: () => (
                <TouchableOpacity
                    style={{ backgroundColor: 'white', border: '1px solid #000', padding: 8, justifyContent: 'center', alignItems: 'center', width: 50 }}
                    onPress={() => navigation.openDrawer()}>
                    <Text style={{ fontWeight: 'bold', color: "rgb(205, 111, 130)" }}>=</Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{ backgroundColor: 'white', border: '1px solid #000', padding: 8, justifyContent: 'center', alignItems: 'center', width: 50 }}
                    onPress={() => navigation.navigate('Cart')}>
                    <Text style={{ fontWeight: 'bold', color: "rgb(205, 111, 130)" }}>C</Text>
                </TouchableOpacity>
            ),
            title: '  CASHIERUN V1.7',
            headerStyle: {
                backgroundColor: 'rgb(205, 111, 130)'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
        }
    }

    state = {
        product: '',
        category: ''
    };

    componentDidMount() {
        this.readProduct()
        this.readCategory()
    }

    async readProduct() {
        await this.props.dispatch(readProduct())
    }

    async readCategory() {
        await this.props.dispatch(readCategory())
    }

    addToCart = async data => {
        await this.props.dispatch(addToCart(data))
    }

    onProduct = async product => {
        this.setState({ product });
        await this.props.dispatch(readProduct(this.state.category, product))
    };

    onCategory = async category => {
        this.setState({ category });
        await this.props.dispatch(readProduct(category, this.state.product))
    };

    renderRow = ({ item }) => {
        return (
            <View style={styles.GridViewBlockStyle}>
                <Image source={{ uri: item.image }} style={{
                    width: 120, height: 120, margin: 8, borderWidth: 1, borderColor: '#d6d7da'
                }} />
                <View style={styles.GridViewTextBlockStyle}>
                    <Text style={styles.GridViewInsideTextItemStyle}>{item.name_product}</Text>
                    <Text style={styles.GridViewInsideTextItemStyle}>Qty {item.stock}</Text>
                    <Text style={styles.GridViewInsideTextItemStyle}>Rp. {item.price}</Text>
                    <View>
                        <TouchableOpacity>
                            <Text style={styles.GridViewCardInsideTextItemStyle} onPress={() => this.addToCart(item)}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { products, categorys } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'column', maxHeight: 120 }}>
                    <TextInput
                        style={{ backgroundColor: 'rgb(205, 111, 130)', color: 'white' }}
                        onChangeText={this.onProduct}
                        value={`${this.state.product}`}
                        autoCorrect={false}
                    />
                    <Picker
                        selectedValue={this.state.category}
                        style={{ width: '100%' }}
                        onValueChange={this.onCategory}>
                        <Picker.Item label="All" value="" />
                        {categorys.map((category, i) => {
                            return (
                                <Picker.Item key={i} value={category.name_category} label={category.name_category} />
                            )
                        })}
                    </Picker>
                </View>
                <View style={styles.MainContainer}>
                    <View>
                        <FlatList
                            data={products}
                            renderItem={this.renderRow}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },
    GridViewBlockStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 235,
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    GridViewTextBlockStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    GridViewInsideTextItemStyle: {
        padding: 2,
        fontSize: 14
    },
    GridViewCardInsideTextItemStyle: {
        // margin: 2,
        color: 'red',
        fontSize: 14
    },
});

const mapStateToProps = (state) => {
    return {
        categorys: state.categorys.categorys,
        products: state.products.products
    }
}

export default connect(mapStateToProps)(HomeScreen);