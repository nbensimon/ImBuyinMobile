import React, { Component }  from 'react';
import { ActivityIndicator, StyleSheet, FlatList, 
         View, TouchableOpacity, Text, TextInput, List,
         ScrollView, DatePickerIOS} from 'react-native';
import Button from 'apsl-react-native-button'
import { StackNavigator } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import t from 'tcomb-form-native';


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
      </View>);
    }
}


const Form = t.form.Form;

const Connection = t.struct({
  email: t.String,
  place: t.String,
  category: t.String,
  when: t.Date
});

class MakeADateScreen extends Component {
  static navigationOptions = {
    title: 'Make A Date'
  };
  
  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    const value = this.refs.form.getValue(); // use that ref to get the form value
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

class FindADateScreen extends Component {
  static navigationOptions = {
      title: 'Have Fun!'
  };
  state = {
    isLoading: true
  }
  
  componentDidMount() {
    fetch('http://127.0.0.1:8000/date/')
    .then((response) => response.json())
    .then((responseJson) => 
    {
      console.log(responseJson)
      //test data
      const test_data =
      [
        {
          "title": "The Basics - Networking",
          "description": "Your app fetched this from a remote endpoint!",
          "movies": [
            { "title": "Star Wars", "releaseYear": "1977"},
            { "title": "Back to the Future", "releaseYear": "1985"},
            { "title": "The Matrix", "releaseYear": "1999"},
            { "title": "Inception", "releaseYear": "2010"},
            { "title": "Interstellar", "releaseYear": "2014"}
          ]
        }
      ]
      const test_data2 = 
      {
        "potential_dates": [
          { "user": "kishore@hotmail.com",
            "date_place": "Cinemark 12",
            "create_date": "2016-09-23T23:00:00Z",
            "accepted": false,
            "category": "General"
          },
          { "user": "nate@hotmail.com",
            "date_place": "BJs",
            "create_date": "2016-09-23T23:00:00Z",
            "accepted": false,
            "category": "Movie"
          }
        ]
      }  
      
      //console.log(response)
      //console.log(test_data2)
      this.setState({
        isLoading: false,
        data: responseJson.potential_dates
        //data: test_data[0].movies
        //data: test_data2.potential_dates
      });
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{paddingTop: 20}}>
        
        <FlatList
          data={this.state.data}
          //data={[{"key": "aasdfasd"}, {"key": "basdfasdf"}]}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => 
           <Text>{item.user}, {item.date_place}</Text>}
        />
      </View>
    );
  }
}

const ImBuyinApp = StackNavigator({
  Home: { screen: HomeScreen },
  Make: { screen: MakeADateScreen },
  Find: { screen: FindADateScreen }
});

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return <ImBuyinApp />;
  }
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 170,
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
