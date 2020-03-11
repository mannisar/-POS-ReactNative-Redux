import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import { readCategory, deleteCategory } from '../../redux/actions/category'

class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => (
                <TouchableOpacity
                    style={{ backgroundColor: 'white', border: '1px solid #000', padding: 8, justifyContent: 'center', alignItems: 'center', width: 100, marginRight: 20 }}
                    onPress={() => navigation.navigate('CategoryAdd')}>
                    <Text style={{ fontWeight: 'bold', color: "rgb(205, 111, 130)" }}>ADD</Text>
                </TouchableOpacity>
            ),
            title: "CATEGORY",
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
        this.readCategory()
    }

    async readCategory() {
        await this.props.dispatch(readCategory())
    }

    onDelete = async (categoryId) => {
        await this.props.dispatch(deleteCategory(categoryId))
    }

    renderRow = ({ item }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.1)", height: 110 }}>
                <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/ios-web-user-interface-flat-circle-shadow-vol-2/512/Archive_docs_folder_Clipboard_document_file_list_report-512.png' }} style={{ width: 100, height: 100 }} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginLeft: 10, marginBottom: 2 }}>{item.name_category}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.props.navigation.navigate('CategoryEdit', {
                            category: item
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
        const { categorys } = this.props
        return (
            <View style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}>
                <FlatList
                    data={categorys}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categorys: state.categorys.categorys
    }
}

export default connect(mapStateToProps)(CategoryScreen);