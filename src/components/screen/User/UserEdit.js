import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';

import { updateUser } from '../../redux/actions/user';

class UserEdit extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        role: "",
    }

    componentDidMount() {
        const user = this.props.navigation.getParam("user");

        this.setState({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        });
    }

    onSubmit = async () => {
        const user = this.props.navigation.getParam("user");
        await this.props.dispatch(updateUser(user.id, this.state));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="name" onChangeText={(text) => this.setState({ name: text })} value={`${this.state.name}`} />
                        </Item>
                        <Item>
                            <Input placeholder="email" onChangeText={(text) => this.setState({ email: text })} value={`${this.state.email}`} />
                        </Item>
                        <Item>
                            <Input secureTextEntry={true} placeholder="password" onChangeText={(text) => this.setState({ password: text })} value={`${this.state.password}`} />
                        </Item>
                        <Item>
                            <Input placeholder="role" onChangeText={(text) => this.setState({ role: text })} value={`${this.state.role}`} />
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
        users: state.users.users
    }
}

export default connect(mapStateToProps)(UserEdit);