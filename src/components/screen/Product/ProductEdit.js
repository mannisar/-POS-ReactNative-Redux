import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';

import { updateProduct } from '../../redux/actions/product';

class ProductEdit extends Component {
    static navigationOptions = {
        title: "EDIT RODUCT",
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
        image: "", // kosong
        price: "",
        stock: "",
        id_category: ""
    }

    componentDidMount() {
        const product = this.props.navigation.getParam("product");

        this.setState({
            name_product: product.name_product,
            description: product.description,
            //image: product.image,
            price: product.price,
            stock: product.stock,
            id_category: product.id_category
        });
    }

    onSubmit = async () => {
        const product = this.props.navigation.getParam("product");
        await this.props.dispatch(updateProduct(product.id, this.state));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="name" onChangeText={(text) => this.setState({ name_product: text })} value={`${this.state.name_product}`} />
                        </Item>
                        <Item>
                            <Input placeholder="description" onChangeText={(text) => this.setState({ description: text })} value={`${this.state.description}`} />
                        </Item>
                        {/* <Item>
                            <Input type="file" onChangeText={(text) => this.setState({ image: text })} />
                        </Item> */}
                        <Item>
                            <Input placeholder="price" onChangeText={(text) => this.setState({ price: text })} value={`${this.state.price}`} />
                        </Item>
                        <Item>
                            <Input placeholder="stock" onChangeText={(text) => this.setState({ stock: text })} value={`${this.state.stock}`} />
                        </Item>
                        <Item>
                            <Input placeholder="category" onChangeText={(text) => this.setState({ id_category: text })} value={`${this.state.id_category}`} />
                        </Item>
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
        products: state.products.products
    }
}

export default connect(mapStateToProps)(ProductEdit);