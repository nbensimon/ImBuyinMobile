import React, { Component }  from 'react';
import { ActivityIndicator, StyleSheet, FlatList, 
         View, TouchableOpacity, Text, TextInput, List,
         ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MyDateScreen from './MyDateScreen';
import MakeADateScreen from './MakeADateScreen';
import FindADateScreen from './FindADateScreen';
import ConfirmInterestScreen from './ConfirmInterestScreen';


class HomeScreen extends Component {
  static navigationOptions = {
    title: 'ImBuyin'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Make')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Make A Date</Text>
            </View>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigate('Find')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Find A Date</Text>
            </View>
         </TouchableOpacity> 
         <TouchableOpacity onPress={() => navigate('Mine')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>My Dates</Text>
            </View>
         </TouchableOpacity>    
      </View>);
    }
}


const HomeScreenNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Make: { screen: MakeADateScreen },
  Find: { screen: FindADateScreen },
  Mine: { screen: MyDateScreen },
  ConfirmInterest: { screen: ConfirmInterestScreen }
});


export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return <HomeScreenNavigator />;
  }
};


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
