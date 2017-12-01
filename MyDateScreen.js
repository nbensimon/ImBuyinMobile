import React, { Component }  from 'react';
import { ActivityIndicator, FlatList, View, 
    Text} from 'react-native';

export default class MyDateScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        me: 'kishore1@hotmail.com',
        isLoading: true
      }
    }
  
    static navigationOptions = {
      title: 'My Dates!'
    };
  
    componentDidMount() {
      URLtofetch='http://10.0.1.140:8000/date?email='.concat(this.state.me)
      fetch(URLtofetch)
      .then((response) => response.json())
      .then((responseJson) => 
      {
  
        this.setState({
          isLoading: false,
          data: responseJson.my_dates
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
              keyExtractor={(item, index) => index}
              renderItem={({item}) => 
              <Text> 
              Where: {item.where} | 
              When: {item.when} |
              {
                item.accepted && 
              <Text> 
               Confirmed with: {item.confirmed_user}
              </Text>
              }
              {!item.accepted && 
              <Text> 
               Interested Users: {item.interested_user_count}</Text>}
              </Text>
              }
            />
          </View>
      );
    }
  }
  