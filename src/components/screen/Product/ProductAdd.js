import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, Picker } from 'native-base';

import { createProduct } from '../../redux/actions/product';
import { readCategory } from '../../redux/actions/category'

class ProductAdd extends Component {
    static navigationOptions = {
        title: "ADD RODUCT",
        headerStyle: {
            backgroundColor: 'rgb(205, 111, 130)'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
    state = {
        name_product: "",
        description: "",
        image: "https://images.yourstory.com/cs/wordpress/2016/08/125-fall-in-love.png", // kosong
        price: "",
        stock: "",
        id_category: ""
    }

    // componentDidMount() {
    //     this.readCategory()
    // }

    // async readCategory() {
    //     await this.props.dispatch(readCategory())
    // }


    onSubmit = async () => {
        await this.props.dispatch(createProduct(this.state));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="name" onChangeText={(text) => this.setState({ name_product: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="description" onChangeText={(text) => this.setState({ description: text })} />
                        </Item>
                        {/* <Item>
                            <Input type="file" onChangeText={(text) => this.setState({ image: text })} />
                        </Item> */}
                        <Item>
                            <Input placeholder="price" onChangeText={(text) => this.setState({ price: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="stock" onChangeText={(text) => this.setState({ stock: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="category" onChangeText={(text) => this.setState({ id_category: text })} />
                        </Item>
                        {/* <Picker
                            selectedValue={this.state.category}
                            style={{ width: '100%' }}
                            onChangeValue={(text) => this.setState({ id_category: text })}>
                            <Picker.Item label="All" value="" />
                            {this.props.categorys.map((category, i) => {
                                return (
                                    <Picker.Item key={i} value={category.name_category} label={category.name_category} />
                                )
                            })}
                        </Picker> */}
                    </Form>
                    <Button primary style={{ margin: 10, backgroundColor: 'rgb(205, 111, 130)' }} onPress={this.onSubmit}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categorys: state.categorys.categorys,
        products: state.products.products
    }
}

export default connect(mapStateToProps)(ProductAdd);