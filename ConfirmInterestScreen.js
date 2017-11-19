import React, { Component }  from 'react';
import {  FlatList, View, Text} from 'react-native';

export default class ConfirmInterestScreen extends Component {
    static navigationOptions = {
        title: 'Confirm Interest!'
    };
    
    render() {
        const {state} = this.props.navigation;
        return(
        <Text>
        {state.params.item.user} |
        {state.params.item.where} |
        {state.params.item.when}
         </Text>);
    }
}