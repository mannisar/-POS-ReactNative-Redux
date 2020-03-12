import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';

import { createCategory } from '../../redux/actions/category';

class CategoryAdd extends Component {
    static navigationOptions = {
        title: "ADD CATEGORY",
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
    }

    onSubmit = async () => {
        await this.props.dispatch(createCategory(this.state));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="name" onChangeText={(text) => this.setState({ name_category: text })} />
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
        categorys: state.categorys.categorys
    }
}

export default connect(mapStateToProps)(CategoryAdd);