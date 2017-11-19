import React, { Component }  from 'react';
import { ActivityIndicator, FlatList, View, 
    Text} from 'react-native';

export default class FindADateScreen extends Component {
    static navigationOptions = {
        title: 'Find A Date!'
    };
    state = {
      isLoading: true
    }
    
    componentDidMount() {
      fetch('http://127.0.0.1:8000/date/')
      .then((response) => response.json())
      .then((responseJson) => 
      {
        const test_data2 = 
        {
          "potential_dates": [
            { "user": "kishore@hotmail.com",
              "where": "Cinemark 12",
              "when": "2016-09-23T23:00:00Z",
              "accepted": false,
              "category": "General"
            },
            { "user": "nate@hotmail.com",
              "where": "BJs",
              "when": "2016-09-23T23:00:00Z",
              "accepted": false,
              "category": "Movie"
            }
          ]
        } 
  
  
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
      const { navigate } = this.props.navigation;
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
            keyExtractor={(item, index) => index}
            renderItem={({item}) => 
             <Text onPress={() => navigate('ConfirmInterest', {item: item})}>
             {item.user} | 
             {item.where} | 
             {item.when}</Text>}
          />
        </View>
      );
    }
  }