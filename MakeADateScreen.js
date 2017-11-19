import React, { Component }  from 'react';
import { ActivityIndicator, FlatList, View, 
    Text, StyleSheet, TouchableOpacity} from 'react-native';
import t from 'tcomb-form-native';


const Form = t.form.Form;
    
const Connection = t.struct({
  email: t.String,
  place: t.String,
  category: t.String,
  when: t.Date
});  

export default class MakeADateScreen extends Component {
    static navigationOptions = {
      title: 'Make A Date!'
    };
    
    handleSubmit = () => {
      const { navigate } = this.props.navigation;
      const value = this.refs.form.getValue(); // use that ref to get the form value
      if (value != null) { // if validation fails, value will be null
        fetch('http://127.0.0.1:8000/date/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: value.email,
            place: value.place,
            when: value.when,
            category: value.category,
            accepted: 'False'
          })
        })
        navigate('Find')
      }
    }
    render() {
      return (
        <View>
          <Form 
            ref='form' // assign a ref
            type={Connection}/>
          <View style={styles.bottomSubmit}>
           <TouchableOpacity onPress={this.handleSubmit}>
             <View style={styles.button}>
               <Text style={styles.buttonText}>Submit</Text>
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
      marginBottom: 60,
      width: 260,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    buttonText: {
      padding: 20,
      color: 'white'
    }
  })