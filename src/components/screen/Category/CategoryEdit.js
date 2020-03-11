import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';

import { updateCategory } from '../../redux/actions/category';

class CategoryEdit extends Component {
    state = {
        name_category: ""
    }

    componentDidMount() {
        const category = this.props.navigation.getParam("category");

        this.setState({
            name_category: category.name_category
        });
    }

    onSubmit = async () => {
        const category = this.props.navigation.getParam("category");
        await this.props.dispatch(updateCategory(category.id, this.state));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="name" onChangeText={(text) => this.setState({ name_category: text })} value={`${this.state.name_category}`} />
                        </Item>
                    </Form>
                    <Button primary style={{ margin: 10 }} onPress={this.onSubmit}>
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

export default connect(mapStateToProps)(CategoryEdit);