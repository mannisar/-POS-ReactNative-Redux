import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';

import { createUser } from '../../redux/actions/user';

class UserAdd extends Component {
    static navigationOptions = {
        title: "ADD USER",
        headerStyle: {
            backgroundColor: 'rgb(205, 111, 130)'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    state = {
        name: "",
        email: "",
        password: "",
        role: "",
    }

    onSubmit = async () => {
        await this.props.dispatch(createUser(this.state));
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ marginRight: 10 }}>
                        <Item>
                            <Input placeholder="name" onChangeText={(text) => this.setState({ name: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="email" onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item>
                            <Input secureTextEntry={true} placeholder="password" onChangeText={(text) => this.setState({ password: text })} />
                        </Item>
                        <Item>
                            <Input placeholder="role" onChangeText={(text) => this.setState({ role: text })} />
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
        users: state.users.users
    }
}

export default connect(mapStateToProps)(UserAdd);