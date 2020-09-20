import React ,{Component} from 'react';
import _ from 'lodash';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import{
  Button,
  FitImage,
  Card,
  CardItem,
  View
} from 'native-base';

import Axios from "axios";
import { Icon } from 'react-native-elements';


//add stars to it
//implement list with redux

class MainList extends Component{
  constructor(props){
    super(props);
    this.state={
        isLoading:false,
        restaurants:[],
        fullRestaurants:[],
        query:"",
    };
    this.loadData();
  }

  loadData(){
    const category = this.props.navigation.getParam('category', '1');
    Axios.post("http://192.168.1.107/restaurant/fetch.php", {category: category})
    .then(response => this.setState({ restaurants: response.data, fullRestaurants:response.data, isLoading: false }))
    .catch(error => alert(error));
 
    
  }
  handleSearch=_.debounce((text)=>{
    console.log("text",text);
   const restaurants=_.filter(this.state.fullRestaurants, item => {return this.contains(item,text);});
    this.setState({query: text, restaurants});
  },250)
  contains=(item,query)=>{
    if(item.name.includes(query)){
      return true;
    }
    return false;
  }

  renderListHeader=()=>{
    return(
      <View style={{flexDirection:'row'}}>
      <Image source={ require( '../icon/search.png') }  style={{width:30,height:30,marginTop:15}}/>
      <TextInput placeholder="جستجو..."  style={{ flex:1,borderColor: 'gray', borderWidth: 0.5 ,borderRadius:10,margin:10,}} onChangeText={this.handleSearch} />
      </View>
    );
  }
  renderItem({item}){
    return(
      <TouchableOpacity
      style={{
        flex: 1,
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "stretch",
        paddingVertical: 5,
        marginBottom: 5,
        borderRadius: 10,
        borderColor:"#FF7F50" ,
        borderWidth:2,
        
      }}
      onPress={() => this.props.navigation.navigate( "هر رستوران", {restId: item.id})}
    >
      <Image source={{ uri: "http://192.168.1.107/resReserve/assets/img/restos/"+item.image }}  style={{ width: 80, height: 80, borderRadius: 20}}/>
     <Text >  {item.name}  </Text>
   
  </TouchableOpacity>
    );
  }
  render(){
    if(this.state.isLoading){
      return(
        <SafeAreaView style={{flex:1, justifyContent:"center" }}>
            <ActivityIndicator size="large" color="red" />
        </SafeAreaView>
      );
    }
    else{
      return(
        <SafeAreaView style={{flex:1, justifyContent:"center" }}>
          <FlatList 
          data={this.state.restaurants}
          renderItem={({item})=> this.renderItem({item})}
          ListHeaderComponent={this.renderListHeader}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  infoBtn: {
        
        width: null,    
        marginTop: 5,
        marginLeft: 12,
        height: 48,
        backgroundColor: '#B84B3D',
        borderRadius: 80
    } ,

})

export default MainList;