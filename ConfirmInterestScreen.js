import React, { Component }  from 'react';
import {  FlatList, 
          StyleSheet, 
          Text, 
          TouchableOpacity, 
          View} from 'react-native';

export default class ConfirmInterestScreen extends Component {
    static navigationOptions = {
        title: 'Confirm Interest!'
    };
    
    handleSubmit(){
        //post in the user that is interested
        
    }

    render() {
        const {state} = this.props.navigation;
        return(
        <View>    
           <Text>
              {state.params.item.user} |
              {state.params.item.where} |
              {state.params.item.when}
            </Text>
            <View style={styles.bottomSubmit}>
            <TouchableOpacity onPress={() => this.handleSubmit()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Confirm</Text>
              </View>
            </TouchableOpacity>
           </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      alignItems: 'center'
    },
    bottomSubmit: {
      alignItems: 'center'
    },
    button: {
      marginTop: 60,
      width: 260,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    buttonText: {
      padding: 20,
      color: 'white'
    }
  })