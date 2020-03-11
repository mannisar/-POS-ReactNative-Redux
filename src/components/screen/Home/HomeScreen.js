import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image, Alert, Platform, StyleSheet } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import DropdownMenu from 'react-native-dropdown-menu';

import { readProduct } from '../../redux/actions/product'
import { addToCart } from "../../redux/actions/cart"
import { Input } from 'native-base';

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
            title: 'CASHIERUN V1.7',
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
    }

    async readProduct() {
        await this.props.dispatch(readProduct())
    }

    addToCart = async data => {
        await this.props.dispatch(addToCart(data))
    }

    onProduct = async product => {
        this.setState({ product });
        this.props.dispatch(readProduct(product))
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
        const { products } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <SearchBar
                        inputStyle={{ backgroundColor: 'white' }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
                        // placeholderTextColor={'#g5g5g5'}
                        placeholder="Search..."
                        onChangeText={this.onProduct}
                        value={`${this.state.product}`}
                        autoCorrect={false}
                    />
                </View>
                <View>
                    {/* <DropdownMenu
                        style={{ flex: 1 }}
                        bgColor={'white'}
                        tintColor={'#666666'}
                        activityTintColor={'green'}
                        // arrowImg={}      
                        // checkImage={}   
                        // optionTextStyle={{color: '#333333'}}
                        // titleStyle={{color: '#333333'}} 
                        // maxHeight={300} 
                        handler={(selection, row) => this.setState({ text: data[selection][row] })}
                        data={products}
                    >
                        <View style={{ flex: 1 }}>
                            <Text>
                                {this.state.category}
                            </Text>
                        </View>
                    </DropdownMenu> */}
                </View>
                <View style={styles.MainContainer}>
                    <FlatList
                        data={products}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
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
        fontSize: 14
    },
});

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps)(HomeScreen);